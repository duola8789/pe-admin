/**
 * Created by zh on 2018/6/6.
 */
import axios from 'axios'
import _ from 'lodash'

import config from '../../config/common';
import * as uiHelper from '@/helper/uiHelper'

const sever = process.env.NODE_ENV === "development" ? config.devServer : config.appServer;

axios.defaults.baseURL = sever.protocol + sever.host + ':' + sever.port;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

// axios.defaults.timeout = 5500;

let loading;
const errorText = '网络错误，请稍后重试';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 发送时展示loading
  loading = uiHelper.showLoading();
  return config;
}, function (error) {
  // 请求错误时取消loading
  loading.close();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 收到相应数据后取消loading
  if (loading) {
    loading.close();
  }
  return response;
}, function (error) {
  // 响应错误时取消loading
  if (loading) {
    loading.close();
  }
  return Promise.reject(error);
});

// 目的在于 将返回的数据 提取出来
const extract = async promise => {
  try {
    const RESULT = await promise;
    var { data: { ret, retCode, retDesc }, config } = RESULT;

    // 针对POST请求
    if (config.method === 'post') {
      let { data } = RESULT;
      if (data) {
        ret = data.ret || data;
        retCode = data.retCode || 200;
        retDesc = data.retDesc || '上传七牛';
      }
      let PARAMS = {};
      if (config.data) {
        decodeURIComponent(config.data).split('&').forEach(val => {
          if (val) {
            const ARR = val.split('=');
            PARAMS[ARR[0]] = ARR[1]
          }
        })
      }
    }
  } catch (e) {
    throw Object({
      code: e.response && e.response.status,
      desc: e.response && e.response.statusText,
      message: e.message
    })
  }

  if (+retCode === 200) {
    return ret;
  }
  else {
    throw Object({ ret, code: retCode, desc: retDesc })
  }
};

// 清除值为 undefined、null、空字符串的参数
const clear = obj => {
  return _.pickBy(obj, (val, key) => {
    return !_.isNil(val, key) && val !== ''
  })
};

export const get = (url, params, config) => extract(
  axios.get(url, {
    params: clear(params),
    ...config
  })
);

export const del = (url, params, config) => extract(
  axios.delete(url, {
    params: clear(params),
    ...config
  })
);

export const post = (url, data, config) => extract(
  axios.post(url, clear(data), {
    transformRequest: [function (data) {
      let ret = '';
      for (const it in data) {
        if (data.hasOwnProperty(it)) {
          ret += encodeURIComponent(it) + '=' + (typeof data[it] === 'object' ? JSON.stringify(data[it]) : data[it]) + '&'
        }
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  })
);

export const put = (url, data, config) => extract(
  axios.put(url, clear(data), {
    transformRequest: [function (data) {
      let ret = '';
      for (const it in data) {
        if (data.hasOwnProperty(it)) {
          ret += encodeURIComponent(it) + '=' + (typeof data[it] === 'object' ? JSON.stringify(data[it]) : data[it]) + '&'
        }
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  })
);

export const postFile = (url, data, config) => {
  const formData = new FormData();
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      formData.append(prop, data[prop])
    }
  }
  return extract(
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: false,
      ...config
    })
  )
};

/**
 * 对接口返回消息处理
 * 成功时返回 ret 中内容
 * 失败使用 retDesc 的内容进行通知
 * 和下面的 forNews 的区别是：成功不通知 用于刷新列表之类的地方
 * @param {Promise} promise - 请求
 * @return {Promise}
 */
export const forData = async promise => {
  try {
    return await promise
  } catch (e) {
    const errorNews = e.code ? `${e.code} ${e.desc}` : `解析错误: ${e.message}`;
    uiHelper.showMessage(errorNews, 'error');
    throw e
  }
};

/**
 * 对接口返回消息处理
 * 成功时返回 ret 中内容，并显示 successNews
 * 失败会使用 retDesc 的内容
 * @param {string | Object} news
 * @param {Promise} promise - 请求
 * @return {Promise}
 */
export const forNews = async (news, promise) => {
  try {
    const ret = await promise;
    const successNews = (typeof news === 'string') ? news : news[200];
    uiHelper.showMessage(successNews, 'success');
    return ret
  } catch (e) {
    let errorNews;
    if(e.code) {
      errorNews = `解析错误: ${e.message}`
    } else {
      errorNews = (typeof news !== 'string' && news[e.code]) ? news[e.code] : `${e.code} ${e.desc}`
    }
    uiHelper.showMessage(errorNews, 'error');
    throw e
  }
};

/**
 * Created by zh on 2018/6/6.
 */
import axios from 'axios'

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
  // 给出提示
  uiHelper.showMessage(errorText, 'error');
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 收到相应数据后取消loading
  if (loading) {
    loading.close();
  }
  return response;
}, function (error, text) {
  // 响应错误时取消loading
  if (loading) {
    loading.close();
  }
  uiHelper.showMessage(errorText, 'error');
  return Promise.reject(error);
});

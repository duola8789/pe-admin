/**
 * Created by zh on 2018/6/6.
 */

import { Loading, Message } from 'element-ui';

export function showLoading() {
  return Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

export function showMessage(message, type = 'success', duration = 1500, callBack) {
  Message({
    message,
    type,
    duration,
    onClose: function () {
      if (callBack) {
        callBack()
      }
    }
  })
}

/**
 * 预览图片
 * @param files 本地文件
 * @returns {Promise<any[]>} Promise.all
 */
export function previewImage(files) {
  // 仅允许上传图片
  if (findBadFile(files)) {
    const error = '只能上传图片';
    showMessage(error, 'error');
    return Promise.reject(error)
  }
  // 封装promise数组
  const promises = Object.keys(files).map(file => (
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[file]);
      reader.addEventListener('load', () => {
        resolve({
          src: reader.result,
          name: files[file].name,
          id: files[file].name + files[file].lastModified,
        })
      })
    })
  ));
  return Promise.all(promises)
}

/**
 * 检测图片类型
 * @param files
 * @returns {Boolean}
 */
export function findBadFile(files) {
  return !!Object.keys(files).find(file => files[file].type.indexOf('image') !== 0)
}



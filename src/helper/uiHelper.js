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


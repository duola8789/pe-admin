/**
 * Created by zh on 2018/6/5.
 */

module.exports = exports = {
  devServer: {
    protocol: 'http://',
    host: '127.0.0.1',
    pagePort: 8088, // 开发前端端口
    port: 8099 // 开发后端口
  },

  appServer: {
    protocol: 'http://',
    host: '139.199.112.184',
    port: 80
  },

  userToken: {
    iss: 'PE'
  }
};

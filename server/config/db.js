/**
 * Created by zh on 2018/6/5.
 */

let dbInfo;

if(process.env.NODE_ENV === 'development') {
  dbInfo = 'mysql://root:zhouhao8789@localhost:3306/pe-admin'; // 测试&开发库
} else {
  dbInfo = 'mysql://root:zhouhao8789@172.21.0.16:3306/zhou'; // 线上库
}

module.exports  = exports = {
  mysql: {
    default: dbInfo
  },
  jwtSecret: 'pe-admin-awesome',
};

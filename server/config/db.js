/**
 * Created by zh on 2018/6/5.
 */

let dbInfo;

if(process.env.NODE_ENV === 'development') {
  dbInfo = 'mysql://root:zhouhao8789@bj-cdb-0ctnqky5.sql.tencentcdb.com:63249/test'; // 测试&开发库
} else {
  dbInfo = 'mysql://root:zhouhao8789@172.21.0.16:3306/zhou'; // 线上库
}

module.exports  = exports = {
  mysql: {
    default: dbInfo
  },
  jwtSecret: 'my-first-try',
};

/**
 * Created by zh on 2018/6/5.
 */
import Sequelize from 'sequelize';
import config from '../config/db';

const mysql = new Sequelize(config.mysql.default, {
  define: {
    timestamps: false,
  },
  operatorsAliases: false
});
export default mysql;

/**
 * Created by zh on 2018/6/5.
 */
import Mysql from '../common/mysql'; // 引入MySQL数据库

const userSchema = '../schema/user'; // 引入user的表结构
const User = Mysql.import(userSchema);// 将Sequelize与表结构对应

export async function getUserById(id) {
  return await User.findOne({
    where: {
      id
    }
  })
}

export async function getUserByName(username) {
  return await User.findOne({
    where: {
      username
    }
  })
}

// 添加用户
export async function createUser(username, password, nickname) {
  return await User.create({
    username,
    password,
    nickname
  });
}



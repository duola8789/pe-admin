/**
 * Created by zh on 2018/6/5.
 */
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as userModal from '../model/userModel'
import config from '../../config/common';
import dbConfig from '../config/db';

export async function getUserInfo(ctx) {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const user = await userModal.getUserById(id);
  if (user) {
    ctx.body = {
      success: true,
      retDsc: '查询成功',
      ret: user
    }
  } else {
    ctx.body = {
      success: false,
      retDsc: '用户不存在',
      ret: null
    };
  }
}

export async function postUserAuth(ctx) {
  const data = ctx.request.body; // post过来的数据存在request.body里
  const userInfo = await userModal.getUserByName(data.username); // 数据库返回的数据

  if (!userInfo) {
    ctx.body = {
      success: false,
      retDsc: '用户不存在',
      ret: null
    };
    return
  }
  if (!bcrypt.compareSync(data.password, userInfo.password)) {
    ctx.body = {
      success: false,
      retDsc: '密码错误',
      ret: null
    };
    return
  }
  const userToken = {
    iss: config.userToken.iss,
    name: userInfo.username,
    id: userInfo.id,
  };
  const secret = dbConfig.jwtSecret; // 指定密钥，这是之后用来判断token合法性的标志
  const token = JWT.sign(userToken, secret); // 签发token
  ctx.body = {
    success: true,
    retDsc: '登陆成功',
    ret: {
      token,
    }
  }
}


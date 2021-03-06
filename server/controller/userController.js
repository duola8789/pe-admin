/**
 * Created by zh on 2018/6/5.
 */
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as userModal from '../model/userModel'
import config from '../../config/common';
import dbConfig from '../config/db';

// 用户注册
export async function createUser(ctx) {
  const data = ctx.request.body; // post过来的数据存在request.body里
  console.log(data);
  const { username, password, nickname } = data;
  // 缺少用户名
  if (!username) {
    ctx.body = {
      success: false,
      retDsc: '缺少用户名',
      ret: null
    };
    return
  }
  // 用户名长度
  if (username.length < 4 || username.length > 12) {
    ctx.body = {
      success: false,
      retDsc: '用户名长度应为4-12位',
      ret: null
    };
    return
  }
  // 用户名包含非法字符
  const reg = /^[a-zA-Z0-9-_]+$/;
  if (!reg.test(username)) {
    ctx.body = {
      success: false,
      retDsc: '用户名只能包含大小写英文字母以及-和_',
      ret: null
    };
    return
  }
  // 缺少密码
  if (!password) {
    ctx.body = {
      success: false,
      retDsc: '缺少密码',
      ret: null
    };
    return
  }
  // 用户名已存在
  const user = await userModal.getUserByName(username);
  if (user) {
    ctx.body = {
      success: false,
      retDsc: '用户名已存在',
      ret: null
    };
    return
  }
  // 密码加密
  const salt = bcrypt.genSaltSync(10);
  const passwordCrypt = bcrypt.hashSync(password, salt);
  // 创建用户
  const ret = await userModal.createUser(username, passwordCrypt, nickname);
  ctx.body = {
    success: !!ret,
    retDsc: ret ? '用户创建成功' : '用户创建失败',
    ret: {
      id: ret.id,
      username: ret.username,
      nickname: ret.nickname,
      updatedAt: ret.updatedAt,
      createdAt: ret.createdAt
    }
  };
}

// 查询用户
export async function getUserInfo(ctx) {
  const id = ctx.query.id; // 获取url里传过来的参数里的id
  const ret = await userModal.getUserById(id);
  if(!ret) {
    ctx.body = {
      success: false,
      retDsc: '用户不存在',
      ret: null
    };
    return;
  }
  ctx.body = {
    success: true,
    retDsc: '查询成功',
    ret: {
      id: ret.id,
      username: ret.username,
      nickname: ret.nickname,
      updatedAt: ret.updatedAt,
      createdAt: ret.createdAt
    }
  }
}

// 用户登录
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
      nickname: userInfo.nickname,
    }
  }
}


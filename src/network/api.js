/**
 * Created by zh on 2018/6/5.
 */
import { frontConf } from '@/config/common'

export const userAPI = {
  login:        '/auth/login', // 登陆 -- POST,
  create:       '/auth/user', // 注册 -- POST,
  find:         '/auth/user', // 查询 -- GET,
};

export const designAPI = {
  find:         '/api/design',
  findAll:      '/api/designs',
  add:          '/api/design',
  update:       '/api/design',
  remove:       '/api/design',
  certificate:  '/api/upload/certificate', // 上传文件凭证 -- GET,
  upload:       frontConf.qiuNiu.uploadUrl, // 上传文件凭证 -- GET,
};


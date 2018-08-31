/**
 * Created by zh on 2018/8/20.
 */
import * as API from '@/network/api'
import { get, post, del, put, postFile } from '@/helper/httpHelper'

// 查询
const find = async (params) =>
  await get(API.designAPI.find, params);

// 查询列表
const findAll = async (params) =>
  await get(API.designAPI.findAll, params);

// 创建
const add = async (params) =>
  await post(API.designAPI.add, params);

// 更新
const update = async (params) =>
  await put(API.designAPI.update, params);

// 删除
const remove = async (params) =>
  await del(API.designAPI.remove, params);

// 上传授权
const certificate = async (params) =>
  await get(API.designAPI.certificate, params);

// 上传图片
const upload = async (params, config) =>
  await postFile(API.designAPI.upload, params, config);

export const design = {
  find,
  findAll,
  add,
  update,
  remove,
  certificate,
  upload
};

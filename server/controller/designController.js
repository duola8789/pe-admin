/**
 * Created by zh on 2018/6/5.
 */
import * as designModal from '../model/designModel'
import { uploadToken } from '../common/qiniu_helper'
import { RET_CODE } from "../config/retCode";

// 获取单个
export async function getDesignById(ctx) {
  const id = ctx.query.id; // 获取url里传过来的参数里的id
  const ret = await designModal.getDesignById(id);
  ctx.body = {
    retCode: ret ? RET_CODE.success : RET_CODE.noContent,
    retDsc: ret ? '查询成功' : '无数据',
    ret
  };
}

// 获取列表
export async function getDesigns(ctx) {
  // 获取url里传过来的参数里
  const pageSize = +ctx.query.pageSize || 10;
  const pageNum = +ctx.query.pageNum || 1;

  // 提取参数
  const query = extract(ctx.query, 'pageSize', 'pageNum');
  const primaryRet = await designModal.getDesigns(pageSize, pageNum, query);

  const ret = primaryRet.rows.map(v => ({
    id: v.id,
    title: v.title,
    thumbnail: v.thumbnail,
    releaseTime: v.releaseTime + '年',
    category: v.category,
    services: v.services,
    comment: v.comment,
    designer: v.designer,
    description: v.description,
    createInfo: `${v.creator}\n\r${new Date(v.createdAt).toLocaleDateString()}`,
    updateInfo: v.updater ? '' : `${v.updater}\n\r${new Date(v.updatedAt).toLocaleDateString()}`,
  }));

  ctx.body = {
    retCode: ret ? RET_CODE.success : RET_CODE.noContent,
    retDsc: !!ret ? '查询成功' : '无数据',
    ret
  };
}

/**
 * 提取对象中除rest之外的键值对，返回新的对象
 * @param object
 * @param rest
 */
function extract(object, ...rest) {
  let result = {};
  Object.keys(object).forEach(val => {
    result[val] = object[val];
    for (const innerVal of rest) {
      if (result[innerVal]) {
        delete result[innerVal]
      }
    }
  });
  return result
}

// 添加
export async function createDesign(ctx) {
  const designInfo = ctx.request.body; // post过来的数据存在request.body里
  // 默认缩略图
  if (!designInfo.thumbnail) {
    designInfo.thumbnail = designInfo.pic.split(',')[0] + '-thumb'
  }
  // 缺少必要信息
  if (!designInfo.title || !designInfo.pic || !designInfo.creator || !designInfo.releaseTime || !designInfo.designer) {
    ctx.body = {
      retCode: RET_CODE.lackParam,
      retDsc: '缺少必要信息',
      ret: null
    };
    return;
  }
  // 存入空值
  Object.keys(designInfo).forEach(val => {
    if (!designInfo[val]) {
      designInfo[val] = '';
    }
  });
  const ret = await designModal.createDesign(designInfo);
  ctx.body = {
    retCode: ret ? RET_CODE.success : RET_CODE.fail,
    retDsc: ret ? '添加成功' : '增加失败',
    ret
  };
}

// 更新
export async function updateDesign(ctx) {
  const designInfo = ctx.request.body; // post过来的数据存在request.body里
  const { id } = designInfo;
  // 必须传入ID
  if (!id && id !== 0) {
    ctx.body = {
      retCode: RET_CODE.lackParam,
      retDsc: 'id is required',
      ret: null
    };
    return;
  }
  // 必须传入更新者
  if (!designInfo.updater) {
    ctx.body = {
      retCode: RET_CODE.lackParam,
      retDsc: 'updater is required',
      ret: null
    };
    return;
  }
  // 默认缩略图
  if (designInfo.pic && !designInfo.thumbnail) {
    designInfo.thumbnail = designInfo.pic.split(',')[0] + '-thumb'
  }
  const ret = await designModal.updateDesign(id, designInfo);
  ctx.body = {
    retCode: ret ? RET_CODE.success : RET_CODE.fail,
    retDsc: ret ? '更新成功' : '增加失败',
    ret
  };
}

export async function deleteDesign(ctx) {
  const { id } = ctx.request.body; // post过来的数据存在request.body里
  // 必须传入ID
  if (!id && id !== 0) {
    ctx.body = {
      retCode: RET_CODE.lackParam,
      retDsc: 'id is required',
      ret: null
    };
    return;
  }
  const ret = await designModal.deleteDesign(id);

  ctx.body = {
    retCode: ret > 0 ? RET_CODE.success : RET_CODE.fail,
    retDsc: ret > 0 ? '删除成功' : '删除失败',
    ret: null
  };
}

export async function getUploadCertificate(ctx) {
  ctx.body = {
    retCode: RET_CODE.success,
    retDsc: '获取凭证成功',
    ret: {
      uploadToken
    }
  };
}



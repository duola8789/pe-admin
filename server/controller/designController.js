/**
 * Created by zh on 2018/6/5.
 */
import * as designModal from '../model/designModel'

// 获取单个
export async function getDesignById(ctx) {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const ret = await designModal.getDesignById(id);
  ctx.body = {
    success: !!ret,
    retDsc: ret ? '查询成功' : '无数据',
    ret
  };
}

// 获取列表
export async function getDesigns(ctx) {
  // 获取url里传过来的参数里
  const pageSize = +ctx.query.pageSize || 20;
  const pageNum = +ctx.query.pageNum || 1;

  const ret = await designModal.getDesigns(pageSize, pageNum);
  ctx.body = {
    success: !!ret,
    retDsc: !!ret ? '查询成功' : '无数据',
    ret
  };
}

// 添加
export async function createDesign(ctx) {
  const designInfo = ctx.request.body; // post过来的数据存在request.body里
  // 默认缩略图
  if(!designInfo.thumbnail) {
    designInfo.thumbnail = designInfo.pic.split(',')[0] + '-thumb'
  }
  // 缺少必要信息
  if(!designInfo.title ||!designInfo.pic || !designInfo.creator || !designInfo.releaseTime || !designInfo.designer) {
    ctx.body = {
      success: false,
      retDsc: '缺少必要信息'
    };
    return;
  }
  // 存入空值
  Object.keys(designInfo).forEach(val => {
    if(!designInfo[val]) {
      designInfo[val] = '';
    }
  });
  const ret = await designModal.createDesign(designInfo);
  ctx.body = {
    success: !!ret,
    retDsc: ret ? '增加成功' : '增加失败',
    ret
  };
}

// 更新
export async function updateDesign(ctx) {
  const designInfo = ctx.request.body; // post过来的数据存在request.body里
  const { id } = designInfo;
  // 必须传入ID
  if(!id && id !== 0) {
    ctx.body = {
      success: false,
      retDsc: 'id is required'
    };
    return;
  }
  // 必须传入更新者
  if(!designInfo.updater) {
    ctx.body = {
      success: false,
      retDsc: 'updater is required'
    };
    return;
  }
  // 默认缩略图
  if(designInfo.pic && !designInfo.thumbnail) {
    designInfo.thumbnail = designInfo.pic.split(',')[0] + '-thumb'
  }
  const ret = await designModal.updateDesign(id, designInfo);
  ctx.body = {
    success: !!ret,
    retDsc: ret ? '增加成功' : '增加失败',
    ret
  };
}

export async function deleteDesign(ctx) {
  const id = ctx.params.id; // post过来的数据存在request.body里
  // 必须传入ID
  if(!id && id !== 0) {
    ctx.body = {
      success: false,
      retDsc: 'id is required'
    };
    return;
  }
  const ret = await designModal.deleteDesign(id);

  ctx.body = {
    success: (ret > 0),
    retDsc: ret > 0 ? '删除成功' : '删除失败',
  };
}



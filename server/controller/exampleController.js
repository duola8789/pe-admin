/**
 * Created by zh on 2018/6/5.
 */
import * as exampleModal from '../model/exampleModel'

export async function getExampleById(ctx) {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const ret = await exampleModal.getExampleById(id);
  ctx.body = {
    success: !!ret,
    retDsc: ret ? '查询成功' : '无数据',
    ret
  };
}

export async function getAllExamples(ctx) {
  const ret = await exampleModal.getAllExamples();
  ctx.body = {
    success: !!ret,
    retDsc: ret ? '查询成功' : '无数据',
    ret
  };
}


export async function createExample(ctx) {
  const data = ctx.request.body; // post过来的数据存在request.body里
  const { title, image } = data;
  const ret = await exampleModal.createExample(title, image);
  ctx.body = {
    success: ret,
    retDsc: ret ? '增加成功' : '增加失败',
  };
}

export async function updateExample(ctx) {
  const data = ctx.request.body; // post过来的数据存在request.body里
  const { id, title, image } = data;
  if(!id && id !== 0) {
    throw new Error('id is required');
  }
  const ret = await exampleModal.updateExample(id, title, image);
  ctx.body = {
    success: ret,
    retDsc: ret ? '更新成功' : '更新失败',
  };
}

export async function deleteExample(ctx) {
  const id = ctx.params.id; // post过来的数据存在request.body里
  if(!id && id !== 0) {
    throw new Error('ids is required');
  }
  const ret = await exampleModal.deleteExample(id);

  ctx.body = {
    success: (ret > 0),
    retDsc: ret > 0 ? '删除成功' : '删除失败',
  };
}



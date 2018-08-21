/**
 * Created by zh on 2018/6/5.
 */
import Mysql from '../common/mysql'; // 引入MySQL数据库
import sequelize from 'sequelize'

const designSchema = '../schema/design'; // 引入表结构
const Design = Mysql.import(designSchema);// 将Sequelize与表结构对应


export async function getDesignById(id) {
  return await Design.findOne({
    where: {
      id
    }
  })
}

export async function getDesigns(pageSize, pageNum, query) {
  return await Design.findAndCountAll({
    where: query,
    offset: (pageNum - 1) * pageSize, //开始的数据索引
    limit: pageSize // 每页限制返回的数据条数
  });
}

export async function createDesign(designInfo) {
  return Design.create({
    title: designInfo.title,
    pic: designInfo.pic,
    thumbnail: designInfo.thumbnail,
    creator: designInfo.creator,
    category: designInfo.category,
    designer: designInfo.designer,
    releaseTime: designInfo.releaseTime,
    description: designInfo.description,
    comment: designInfo.comment,
  });

}

export async function updateDesign(id, designInfo) {
  const design = await Design.findOne({
    where: {
      id
    }
  });
  if (!design) {
    return false;
  }
  Object.keys(designInfo).forEach(val => {
    design[val] = designInfo[val]
  });
  return design.save();
}

export async function deleteDesign(id) {
  return await Design.destroy({
    where: {
      id
    }
  });
}

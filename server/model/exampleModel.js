/**
 * Created by zh on 2018/6/5.
 */
import Mysql from '../common/mysql'; // 引入MySQL数据库
import sequelize from 'sequelize'

const exampleSchema = '../schema/example'; // 引入user的表结构
const Example = Mysql.import(exampleSchema);// 将Sequelize与表结构对应

export async function getAllExamples() {
  return await Example.findAll()
}

export async function getExampleById(id) {
  return await Example.findOne({
    where: {
      id
    }
  })
}

export async function createExample(title, image) {
  await Example.create({
    title,
    image
  });
  return true
}

export async function updateExample(id, title, image) {
  const example = await Example.findOne({
    where: {
      id
    }
  });
  if (!example) {
    return false;
  }
  if (title) {
    example.title = title;
  }
  if (image) {
    example.image = image;
  }
  await example.save();
  return true
}

export async function deleteExample(id) {
  return await Example.destroy({
    where: {
      id
    }
  });
}

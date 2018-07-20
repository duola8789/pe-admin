/**
 * Created by zh on 2018/6/5.
 */
import * as exampleController from '../controller/exampleController'
import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/example/:id', exampleController.getExampleById); // 查询example
router.get('/examples', exampleController.getAllExamples); // 查询所有example
router.post('/example', exampleController.createExample); // 创建example
router.put('/example', exampleController.updateExample); // 更新example
router.delete('/example/:id', exampleController.deleteExample); // 删除example

export  {
  router
};

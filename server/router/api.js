/**
 * Created by zh on 2018/6/5.
 */
import * as designController from '../controller/designController'
import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.post('/design', designController.createDesign); // 创建design
router.get('/design', designController.getDesignById); // 查询design
router.get('/designs', designController.getDesigns); // 查询design列表
router.put('/design', designController.updateDesign); // 更新design
router.delete('/design', designController.deleteDesign); // 删除design

router.get('/upload/certificate', designController.getUploadCertificate); // 获取上传图片的凭证

export  {
  router
};

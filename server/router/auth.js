/**
 * Created by zh on 2018/6/5.
 */
import * as userController from '../controller/userController'
import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/user/:id', userController.getUserInfo);
router.post('/login', userController.postUserAuth);
router.post('/user', userController.createUser);

export  {
  router
};

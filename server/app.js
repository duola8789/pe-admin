/**
 * Created by zh on 2018/6/5.
 */

import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import KoaJson from 'koa-json';
import Kcors from 'kcors';
import jwt from 'koa-jwt';
import Compress from 'koa-compress';

import path from 'path';
import staticServer from 'koa-static';

import config from '../config/common'
import dbConfig from './config/db';
import * as auth from './router/auth';
import * as api from './router/api';

const app = new Koa();
const router = new KoaRouter();

const authRouter = auth.router;
const apiRouter = api.router;

app.use(Compress({
  threshold: 2048 // 要压缩的最小响应字节
}));

app.use(KoaBodyParser());
app.use(KoaLogger());
app.use(KoaJson());

// 跨域设置
const corsOptions = {
  'origin': '',
  'credentials': true,
  'maxAge': 3600
};
app.use(Kcors(corsOptions));

// log
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  let ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms); // 显示执行的时间
});

// 如果JWT验证失败，返回验证失败信息
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        retDsc: 'Protected resource, use Authorization header to get access',
        ret: null
      }
    } else {
      throw err
    }
  }
});

app.on('error', (err, ctx) => {
  console.log('server error: ', err);
});

app.use(staticServer(path.resolve('dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

router.use('/auth', authRouter.routes());
router.use('/api', jwt({ secret: dbConfig.jwtSecret }), apiRouter.routes()); // 所有走/api/打头的请求都需要经过jwt验证。

app.use(router.routes());

app.listen(config.appServer.port, () => {
  console.log(`Koa is listening in ${config.appServer.port}`);
});

export default app;

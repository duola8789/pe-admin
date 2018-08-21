import Vue from 'vue'
import Router from 'vue-router'
import JsonWebToken from 'jsonwebtoken';
import Login from '@/pages/Login'
import Design from '@/pages/Design'
import DesignAll from '@/pages/DesignsAll'
import config from '../../config/common';
import URL from '@/router/url'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: URL.root,
      redirect: URL.login,
      name: 'index',
    }, {
      path: URL.login,
      name: 'Login',
      component: Login
    }, {
      path: `${URL.design}/:id?`,
      name: 'design',
      component: Design,
      exact: true
    }, {
      path: URL.designAll,
      name: 'designAll',
      component: DesignAll
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('userToken');
  const isTokenRight = !!(token && JsonWebToken.decode(token) && (JsonWebToken.decode(token).iss === config.userToken.iss));

  // 全局设定发送请求header的token验证
  if (isTokenRight) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  if (to.path === URL.login) { // 如果是跳转到登陆页的
    if (isTokenRight) { // 如果有token就转向admin页不返回登录页
      next(URL.designAll)
    } else { // 否则呆在登陆页
      next()
    }
  } else {
    if (isTokenRight) { // 如果有token就正常转向
      next()
    } else {
      next(URL.login) // 否则跳转回登录页
    }
  }
});

export default router;

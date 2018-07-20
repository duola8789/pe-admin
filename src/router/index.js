import Vue from 'vue'
import Router from 'vue-router'
import JsonWebToken from 'jsonwebtoken';
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import AdminALL from '@/components/AdminALL'
import config from '../../config/common';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'index',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/:id',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin',
      name: 'adminAll',
      component: AdminALL
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

  if (to.path === '/login') { // 如果是跳转到登陆页的
    if (isTokenRight) { // 如果有token就转向admin页不返回登录页
      next('/admin')
    } else { // 否则呆在登陆页
      next()
    }
  } else {
    if (isTokenRight) { // 如果有token就正常转向
      next()
    } else {
      next('/login') // 否则跳转回登录页
    }
  }
});

export default router;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '@/helper/elementHelper'
import App from './App'
import router from './router'
import Axios from 'axios';
import Cookie from 'js-cookie'

import '@/helper/httpHelper';

Vue.prototype.$http = Axios;
Vue.prototype.$cookie = Cookie;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

/**
 * Created by zh on 2018/6/29.
 */
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

import {
  Table, TableColumn, Row, Col,
  Input,
  Button
} from 'element-ui'

[
  Table, TableColumn, Row, Col,
  Input,
  Button
].forEach(Compo => Vue.use(Compo));

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$message = Message;

export default Vue

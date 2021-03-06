/**
 * Created by zh on 2018/6/29.
 */
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

import {
  Table, TableColumn, Row, Col,
  Input,
  DatePicker,
  RadioButton,
  RadioGroup,
  CheckboxGroup,
  CheckboxButton,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Card,
  Tooltip,
  MessageBox,
} from 'element-ui'

[
  Table, TableColumn, Row, Col,
  Input,
  DatePicker,
  RadioButton,
  RadioGroup,
  CheckboxGroup,
  CheckboxButton,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Card,
  Tooltip
].forEach(Compo => Vue.use(Compo));

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

export default Vue

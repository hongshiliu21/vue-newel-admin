import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router.js";
import store from "./store"
// 引入全局配置文件
import $conf from "./common/config/config.js";
import "./assets/js/base";
import "../src/assets/css/bootstrap.min.css";
import components from "./components/components"; // 引入公共组件
import {
  Message
} from 'element-ui';
import axios from "axios";


// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, err => {
  // 对响应错误做点什么
  if (err.response && err.response.data && err.response.data.errorCode) {
    Message.error(err.response.data.msg);
  }
  return Promise.reject(err);
});


Vue.prototype.$conf = $conf;
Vue.config.productionTip = false;

Vue.use(components);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
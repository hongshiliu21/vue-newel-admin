import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router.js";
import store from "./store"

// 引入全局配置文件
import $conf from "./common/config/config.js";
Vue.prototype.$conf = $conf;

import "./assets/js/base";
import "../src/assets/css/bootstrap.min.css";
import components from "./components/components"; // 引入公共组件
import {
  Message
} from 'element-ui';
import axios from "axios";


let loading = null;
let requestCount = 0; // 请求数

// 显示loading
function showLoading() {
  if (requestCount === 0) {
    loading = Message({
      message: '加载中...',
      duration: 0
    });
  }
  requestCount++;
}


// 隐藏loading
function hideLoading() {
  if (requestCount > 0) {
    requestCount--;

  }
  if (loading && requestCount === 0) {
    loading.close();
  }
}

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  let token = window.sessionStorage.getItem("token");
  if (config.token) {
    config.headers["token"] = token;
  }
  // 显示loading
  if (config.loading) { // 为真
    showLoading();
  }

  return config;
}, error => {
  // 对请求错误做些什么
  // 隐藏loading
  hideLoading();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  // 隐藏loading
  hideLoading();
  return response;
}, err => {
  // 对响应错误做点什么
  if (err.response && err.response.data && err.response.data.errorCode) {
    Message.error(err.response.data.msg);
  }
  // 隐藏loading
  hideLoading();
  return Promise.reject(err);
});

// 注册一个全局自定义指令 `v-auth`，控制按钮的权限
Vue.directive('auth', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    let user = window.sessionStorage.getItem("user");
    user = user ? JSON.parse(user) : {};
    // super:1表示是超级管理员
    if (!user.super) {
      let rules = user.ruleNames ? user.ruleNames : [];
      let v = rules.find(item => item === binding.value);
      if (!v) {
        el.parentNode.removeChild(el);
      }
    }
  }
})

Vue.config.productionTip = false;

Vue.use(components);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
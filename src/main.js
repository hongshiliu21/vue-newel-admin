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
// import zrDrawHtml from "zr-draw-html";
// import "zr-draw-html/lib/zr-draw-html.css";
import zrDrawHtml from "zr-draw-html/lib/zr-draw-html.common.js";
import "zr-draw-html/lib/zr-draw-html.css";

Vue.prototype.$conf = $conf;
Vue.config.productionTip = false;

Vue.use(zrDrawHtml);
Vue.use(components);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

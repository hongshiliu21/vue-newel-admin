import Vue from "vue"
import Router from "vue-router"

import routes from "./common/config/router.js"

Vue.use(Router)


let router = new Router({
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem("token");
    // 已登录
    if (token) {
        next(); //放行
    } else {
        // 跳转到登录页验证
        if (to.path === "/login") {
            return next();
        }
        // 未登录
        Vue.prototype.$message.error("请先登录！")
        next("/login");

    }

})


export default router;
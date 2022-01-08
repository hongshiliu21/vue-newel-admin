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
        // 防止重复登录
        if (to.path === "/login") {
            console.log("from");
            console.log(from);
            Vue.prototype.$message.error("请不要重复登录！")
            return next({
                name: from.name ? from.name : "index"
            })
        }

        // 其他验证...
        let rules = window.sessionStorage.getItem("rules");
        rules = rules ? JSON.parse(rules) : [];
        console.log("rules");
        console.log(rules);
        let _index = rules.findIndex(item => {
            return item.rule_id > 0 && item.desc === to.name   //item.rule_id > 0 表示是父接点
        });

        console.log("_index", _index);
        next(); //放行
    } else {
        // 跳转到登录页验证
        if (to.path === "/login") {
            return next();
        }
        // 未登录
        Vue.prototype.$message.error("请先登录！")
        next({
            path: "/login"
        });
    }

})


export default router;
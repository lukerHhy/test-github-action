import Vue from "vue"; //引入Vue
import Router from "vue-router"; //引入vue-router
import agentRouter from "./agent"; //引入代理路由
// import agentRouter from "../common_router/agent"; //引入代理路由

import CurrentIndextRouter from '@assets/router/index'
import activity from "./activity"; // 引入活动路由
import sponsor from "./sponsor"; // 引入赞助路由


//Vue全局使用Router
Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: "history",
    routes: [
        ...CurrentIndextRouter,
        // -------代理中心路由-------结束-------
        ...sponsor,
        ...activity,
        ...agentRouter
    ]
});

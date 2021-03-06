// import Vue from 'vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import index from "./components/index.vue"
import login from "./components/login.vue"
import users from "./components/user.vue"
import roles from "./components/roles.vue"
import rights from "./components/rights.vue"
import goods from "./components/goods.vue"
import categories from "./components/categories.vue"
import orders from "./components/orders.vue"
import params from "./components/params.vue"
import reports from "./components/reports.vue"
import { from } from 'array-flatten';
import error from "./components/error.vue"
let routes = [{
        path: "/",
        component: index,
        children: [{
                path: "users",
                component: users,
            },
            {
                path: "roles",
                component: roles,
            },
            {
                path: "rights",
                component: rights,
            },
            {
                path: "goods",
                component: goods,
            },
             {
                path: "categories",
                component: categories,
            },
            {
                path: "orders",
                component: orders,
            },
            {
                path: "params",
                component: params,
            },
            {
                path: "reports",
                component: reports,
            },
        ]
    },
    {
        path: "/error",
        component: error,
        // 增加字段的判定, 是否登录
       
    },
    {
        path: "/login",
        component: login,
        // 增加字段的判定, 是否登录
        meta:{
            isLogin:true
        }
    }
]
let router = new VueRouter({
    routes
})
// 注册全局导航守卫
router.beforeEach((to,from,next)=>{
    // 加的字段
    if (to.meta.isLogin===true) {
        next()
    } else {
        if ( window.sessionStorage.getItem("token") ) {
            next()
        } else {
            Vue.prototype.$message.error("去登录")
            next('/login')
        }
    }
    if (to.matched.length==0) {
        next('/error')
    }
})

export default router
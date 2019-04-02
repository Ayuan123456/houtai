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
        path: "/login",
        component: login,

    }
]
let router = new VueRouter({
    routes
})

export default router
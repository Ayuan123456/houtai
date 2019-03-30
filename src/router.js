// import Vue from 'vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import index from "./components/index.vue"
import login from "./components/login.vue"
import user from "./components/user.vue"

let routes= [
    {
        path:"/",
        component:index,
        children:[
            {
            path:"user",
            component:user,
        }
    ]
    },
    {
        path:"/login",
        component:login,
       
    }
]
let router=new VueRouter({
    routes
})

export default router
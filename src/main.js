import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/comment.css";
import mybread from "./components/myBread.vue";
Vue.component('my-bread',mybread);

import axios from "./myaxios.js"
Vue.use(axios)

import { from } from 'array-flatten';

import store from "./store"

Vue.use(ElementUI);
// 拦截请求, 比如在发请求前统一设置token
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/comment.css";
import mybread from "./components/myBread.vue";
Vue.component('my-bread',mybread);
import axios from "axios";
import { from } from 'array-flatten';
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

Vue.prototype.$axios=axios

Vue.use(ElementUI);
// 拦截请求, 比如在发请求前统一设置token
Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {
  // 加请求
  config.headers.Authorization=window.sessionStorage.getItem("token")
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//  请求回来,统一做处理
axios.interceptors.response.use(function (response) {
  if ([200,201,204].indexOf(response.data.meta.status)!=-1) {
    Vue.prototype.$message.success(response.data.meta.msg)
  }else{
    Vue.prototype.$message.error(response.data.meta.msg)
  }

  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

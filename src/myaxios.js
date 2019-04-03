import axios from "axios";
import router from "./router";
export default {
    install(Vue) {
        axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
        axios.interceptors.request.use(
            function (config) {
                // 加请求
                config.headers.Authorization = window.sessionStorage.getItem("token");
                return config;
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        //  请求回来,统一做处理
        axios.interceptors.response.use(
            function (response) {
                // console.log(response);
                
                if (response.data.meta.msg=='无效token' && response.data.meta.status==400) {
                    Vue.prototype.$message.error("伪造的token, 请正确登录")
                    window.sessionStorage.removeItem('token')
                    router.push('/login')
                   
                    return
                } 
                if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
                    Vue.prototype.$message.success(response.data.meta.msg);
                } else {
                    Vue.prototype.$message.error(response.data.meta.msg);
                }

                return response;
            },
            function (error) {
                // Do something with response error
                return Promise.reject(error);
            }
        );
        

        Vue.prototype.$axios = axios
    }
};
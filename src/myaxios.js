import axios from "axios";
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
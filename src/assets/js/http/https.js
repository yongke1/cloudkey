/**axios配置 */

import _hyTool from "@assets/js/tool/tool";
import axios from "axios";
import router from "@/route";
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 请求头添加token
    config.headers['Authorization'] = 'bearer ' + _hyTool.getStore('token');
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // (响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: "login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 500:
          throw new Error("error 500")
        case 502:
          throw new Error("error 502")
        case 504:
          throw new Error("error 504")
      }
    }
    return Promise.reject(error);
  }
);

export default axios;

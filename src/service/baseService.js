/**
 * 时间：2020-09-10
 * 描述：服务基类
 */
import axios from "@assets/js/http/https";

export const fetch = axios;

export const apiFormat = (str, res) => {
  let reg = /\{(\w+?)\}/gi;
  return str.replace(reg, ($0, $1) => {
    return res[$1];
  });
};

//get 参数拼接
export const apiFormat2 = (url, params) => {
  if (params) {
    let propertys = Object.keys(params);
    url = url + "?";
    propertys.forEach((key, index) => {
      if (index === propertys.length - 1) {

        url = url + key + "=" + params[key];
      } else {
        url = url + key + "=" + params[key] + "&";
      }
    });
  }
  return url;
};

//export const devHttp = 'http://10.32.120.175:11145'
//export const devHttp = 'http://34.212.227.2:5000'
// export const devHttp = 'http://localhost:5000'    //本地
export const devHttp = 'http://10.32.138.76:5000'     //王凯
// export const devHttp = 'http://10.32.138.5:8001'  //华巍的



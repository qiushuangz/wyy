import axios from "axios";
import { Notify } from "vant";
import NProgress from "nprogress";
import { serverUrl, getToken, removeToken } from "./tools";

const instance = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: serverUrl, // 请求的基础地址
});

// 继续封装一个请求和相应拦截
// 比如有些服务器接口在请求之前需要添加全局统一的配置信息
//  我们需要对网络请求的异常做统一捕获
// Add a request interceptor
//  全局请求拦截，在发起请求之前触发
//    1. 添加全局loading
//    1. 在请求头添加token
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    // Do something before request is sent
    /// 做了一个全局请求拦截，所有的网络请求触发之前都会加
    config.headers.authorization = "Bearer " + getToken(); // 在请求头中添加token
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// 全局相应拦截，网络请求返回之后触发，可以做错误处理
//  1. 清除loading
//  2. 错误异常处理
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    NProgress.done();
    console.dir(error);
    if (error.message && error.message.indexOf("timeout") > -1) {
      Notify({
        type: "danger",
        message: "网络不稳定，请刷新重试",
      });
    }
    if (error.response && error.response.status === 401) {
      Notify({
        type: "danger",
        message: "用户信息异常",
      });
      removeToken(); // 清除原有的token
      window.location.href = "/#/login";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * 发起get请求
 * @param {*} url
 * @param {*} params
 */
export const get = (url, params) => instance.get(url, { params });

// export function get(url, params) {
//   return instance.get(url, { params })
// }

/**
 * 发起post请求
 * @param {*} url
 * @param {*} data
 */
export const post = (url, data) => instance.post(url, data);

/**
 * put请求
 * @param {*} url
 * @param {*} data
 */
export const put = (url, data) => instance.put(url, data);

/**
 * delete请求
 * @param {*} url
 */
export const del = (url) => instance.delete(url);

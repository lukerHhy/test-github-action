/**
 * axios 的封装
 */

import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_AGENT_API_URL, // api的base_url
  // timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const merchant_no = process.env.VUE_APP_MERCHANT_NO;
    const access_token = window.localStorage.agToken;
    const lang = window.localStorage.language || "zh";

    const defaultConfig = {
      lang,
      merchant_no,
      access_token,
    };

    config.headers["X-Device-Type"] = "h5";

    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "patch"
    ) {
      config.data = Object.assign({}, defaultConfig, config.data || {});
    } else {
      config.params = Object.assign({}, defaultConfig, config.params || {});
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    //if (window.localStorage.token) {
    if (response.data.code === -998 || response.data.code === -999) {
      Toast.fail(
        localStorage.getItem("i18n") == "en"
          ? "Login timed out, please login again"
          : "登录超时，请重新登录"
      );
      setTimeout(() => {
        window.location.href = "/agentLogin";
      }, 1500);
    } else if (response.data.code < 0) {
      Toast.fail(response.data.msg);
    }
    //}
    return response;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;

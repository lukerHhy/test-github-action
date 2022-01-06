/**
 * axios 的封装
 */

import axios from "axios";
import { Toast } from "vant";
import store from "@/store";
import * as types from "../store/types";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_H5_API_URL, // api的base_url
  // timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const merchant_no = process.env.VUE_APP_MERCHANT_NO;
    const access_token = window.localStorage.token || store.state.users.token;
    const lang = window.localStorage.i18n || "zh";

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
      // if (config.data) config.data.merchant_no = merchant_no
      config.data ? (config.data.merchant_no = merchant_no) : {};
      config.data ? (config.data.access_token = access_token) : {};
      config.data ? (config.data.lang = lang) : {};
    } else {
      if (config.params) {
        config.params.merchant_no = merchant_no;
        config.params.access_token = access_token;
        config.params.lang = lang;
      } else {
        config.params = {
          merchant_no,
          access_token,
          lang,
        };
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === -998 || response.data.code === -999) {
      if (["10042"].includes(process.env.VUE_APP_PROJECT_NAME)) {
        store.commit("global/" + types.SET_LOGINPOPUP_SHOW, true);
      } else {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }

      store.dispatch("users/updateToken", "");
      store.dispatch("users/updateUserInfo", null);
    }

    if (
      response.data.code !== 0 &&
      response.data.code !== 1 &&
      response.data.code !== "-9" &&
      response.data.code !== -13
    ) {
      Toast.fail({
        message: response.data.msg,
        duration: 3000,
      });
      throw new Error(response.data.msg);
    }

    return response;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;

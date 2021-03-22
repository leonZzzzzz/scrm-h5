import axios from "axios";
import qs from "qs";
import { BASEURL, DOMAINADDRESS, ISMOBILE, BASEAPI } from "../config";
import { Notify, Toast } from "vant";
import router from "../router";
import api from "../api";
import Utils from "../utils/utils"

const IS_DEV = process.env.NODE_ENV == "development";

axios.defaults.timeout = 600000; // 响应时间
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; // 配置请求头
axios.defaults.baseURL = BASEURL;

axios.interceptors.response.use(
  (res) => {
    // console.log('返回' + res.data.code)
    if (
      res.data.code === 20000 ||
      res.data.code === 40001 ||
      res.data.code === 12003 ||
      res.data.code === 1009 ||
      res.data.code === 110
    ) {
      return res;
    } else if (res.data.code === 63101) {
      if (IS_DEV) return Promise.reject(res); // 如果是在本地开发环境 不让走下面的重定向
      if (!Utils.envJudge()) {
        Notify({
          type: "warning",
          message: "请在企业微信中打开此页面",
        });
        return Promise.reject(res);
      }
      // 增加一个授权次数限制，避免在不可预知的情况下重复去授权
      let limitTimes = sessionStorage.getItem("authorizeTimes") || 0;
      let increaseTimes = parseInt(limitTimes) + 1;
      console.log("申请授权次数", limitTimes + "//" + increaseTimes);
      if (increaseTimes >= 4) {
        Notify({
          type: "warning",
          message: "授权失败，请关闭后重试",
        });
      } else {
        sessionStorage.setItem("authorizeTimes", increaseTimes);
        // let url = "";
        // let l = location;
        // let str = l.hash.substr(1, l.hash.length - 1);
        // if (str.indexOf("?") != -1) {
        //   url = l.origin + l.pathname + "POUND" + str.split("?")[0];
        // } else {
        //   url = l.origin + l.pathname + "POUND" + str;
        // }
        
        // 拼接重组重定向的路径，分割清除路径携带的location.search信息
        let url = "";
        let str = location.origin + location.pathname + location.hash
        url = encodeURIComponent(str);
        console.log('使用urlEncode编码', url);
        if (ISMOBILE) {
          location.href = `${BASEAPI}/api/v1/crop/authorize/auth?requestUrl=${url}`;
        } else {
          let requestUrl = url;
          api.authorizeAuth({ requestUrl }).then((res) => {});
        }
      }
      return Promise.reject(res);
    } else if (res.data.code === 63100) {
      // 跳转至成员无权限页面
      location.href = `${BASEAPI}/scrmpermit/POUND/permission`;
    } else {
      if (res.data.message) {
        Toast(res.data.message);
      }

      return Promise.reject(res);
    }
  },
  function axiosRetryInterceptor(err) {
    return Promise.reject(err);
  }
);
export const get = (url, params) => {
  return axios.get(url, { params });
};

export const post = (url, params) => {
  return axios.post(url, qs.stringify(params));
};
export const json = (url, params) => {
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const upload = (url, params) => {
  return axios.post(url, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

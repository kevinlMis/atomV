import axios from "axios";
import store from "@/store";
import {
  getToken
} from "@/utils/auth";
import qs from "qs";
const Qs = require('querystring');

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "x-requested-with": "XMLHttpRequest"
  },
  // 请求预处理函数 可以将传的param进行处理
  transformRequest: [
    data => {
      return Qs.stringify(data);
    }
  ],
  paramsSerializer: params => {
    return qs.stringify(params, {
      indices: false
    });
  },
  timeout: 0
});

function hasBeenLogoutMesBox() {
  this.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.dispatch("user/resetToken").then(() => {
      location.reload();
    });
  }).catch(() => {
  });
}

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    // config.headers["Content-Type"] = "text/plain;charset=UTF-8";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const { data } = response || {}
    if (data.success === true) {
      return data;
    }
    if (data.code === '200') {
      return data;
    }
    if (response.config.responseType === "json") {
      return data;
    }
    if (response.errMessage) {
      return Promise.reject(new Error(response.errMessage))
    }
    return data
  },
  error => {
    const {
      status
    } = error.response;
    const options = {
      message: `连接出错(${status})`,
      errorCode: "5000",
      type: "error",
      duration: 2 * 1000
    };
    if (status === 500) {
      this.$message({
        type: "error",
        message: options.message
      });
    } else if (status === 404) {
      this.$message({
        type: "error",
        message: options.message
      });
    } else {
      this.$message({
        type: "error",
        message: options.message
      });
    }
    return Promise.reject(error);
  }
);
export default service

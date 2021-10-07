import Vue from "vue";

import "normalize.css/normalize.css";
import "@/styles/index.scss";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import Header from "@/components/Header";
import App from "./App";
import store from "./store";
import router from "./router";
import stack from "./stack";
import '@/icons'
import '@/directive'
import "@/permission";
import "lib-flexible";
import '@/utils/muiLoading'
import echarts from "echarts";

Vue.prototype.$echarts = echarts;
Vue.prototype.$store = store;
Vue.prototype.$eventBus = new Vue();
Vue.use(ElementUI, { locale })

const Base64 = require("js-base64").Base64;
Vue.config.productionTip = false;
Vue.component("Header", Header);
new Vue({
  el: "#app",
  router,
  store,
  stack,
  Base64,
  render: h => h(App)
});

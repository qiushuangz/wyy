//默认引入
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

axios.defaults.withCredentials = true; //让ajax携带cookie

Vue.prototype.$axios = axios;

//自己添加的
import Vant from "vant"; //引入vant
import "vant/lib/index.css"; // 引入vant的css文件
import "nprogress/nprogress.css"; //加载进度条
import elementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Vant);
Vue.use(elementUi);
//引入格式化日期的插件
import moment from "moment/moment";
//格式化时间戳过滤器
Vue.filter("moment", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value).format(formatString);
});

//脚手架默认的配置-statr
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

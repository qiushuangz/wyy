//默认引入
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//自己添加的
import Vant from "vant"; //引入vant
import "vant/lib/index.css"; // 引入vant的css文件
import "nprogress/nprogress.css"; //加载进度条
import elementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Vant);
Vue.use(elementUi);

//脚手架默认的配置-statr
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

// import { serverUrl } from "@/utils/tools";//过滤图片地址

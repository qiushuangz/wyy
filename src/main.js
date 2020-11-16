//默认引入
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.$axios = axios;
//////////////////////////////////////////////////// VUEX
import Vuex from "vuex";
Vue.use(Vuex);
// 创建一个vuex实例
const store = new Vuex.Store({
  // 数据
  state: {
    song_url: "", //播放地址
    sliderTime: 0, //进度条的百分比数字
    playing: false, //播放状态
    index: 0, //拖动进度条传入的时间
    maxTime: 0, //歌曲的总时长
    currentTime: 0, //跳转的时间
    Timeupdate: 0, //当前播放时间
  },
  mutations: {
    set_url(state, data) {
      state.song_url = data;
    },
    set_sliderTime(state, data) {
      state.sliderTime = data;
    },
    set_playing(state, data) {
      state.playing = data;
    },
    set_index(state, data) {
      state.index = data;
    },
    set_maxTime(state, data) {
      state.maxTime = data;
    },
    set_currentTime(state, data) {
      state.currentTime = data;
    },
    set_Timeupdate(state, data) {
      state.Timeupdate = data;
    },
  },
});
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
  store, // store: store // 把vuex对象注入到vue实例中,在任何一个组件中可以直接使用$store获取内容
  render: (h) => h(App),
}).$mount("#app");

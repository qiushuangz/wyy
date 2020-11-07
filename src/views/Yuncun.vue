<template>
  <div class="yuncun">
    <van-tabs animated>
      <van-tab title="关注"> 888 </van-tab>
      <van-tab title="热评墙">
        <div>
          <img
            class="img_tou"
            src="http://p1.music.126.net/Hha3dhQeYEfFTwOVRAFxow==/109951165182848748.jpg"
            alt=""
          /><span>孤独万岁</span>
        </div>
        <p class="text_maohao">“</p>
        <p>
          租的房子离机场很近 每天上下班看到飞机都会忍不住抬头看
          总是想这趟航班是不是飞往她在的城市
        </p>
        <div><span>经济舱</span>-<span>KL-刘聪</span>-<span>❤</span></div>
      </van-tab>

      <van-tab title="关注">
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button type="primary" @click="check_status()"
          >获取个人信息</el-button
        >
        <el-button type="primary" @click="login_out()">登出</el-button>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { loginAPI, statusAPI, loginoutAPI, gettrendsAPI } from "@/api/yuncun";
export default {
  data() {
    return {
      // activeName: "second",
    };
  },
  async created() {
    let res = await gettrendsAPI({ uid: "297992979" });
    console.log(res);
  },
  methods: {
    // onClick(name, title) {
    // Toast(title);
    // },
    async login() {
      const u = await loginAPI();
      console.log(u);
      // setToken("token", u.cookie);
    },
    async check_status() {
      const uu = await statusAPI();
      console.log(uu);
    },
    async login_out() {
      const log_out = await loginoutAPI();
      console.log(log_out);
    },
  },
};
</script>

<style scoped>
.img_tou {
  width: 8vw;
  border-radius: 4vw;
}
.text_maohao {
  font-size: 30vw;
  margin: 0;
  height: 14vw;
}
</style>
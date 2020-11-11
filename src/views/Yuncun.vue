<template>
  <div class="yuncun">
    <topbar></topbar>

    <van-tabs animated>
      <van-tab title="热评墙">
        <hotwall></hotwall>
      </van-tab>
      <van-tab title="关注">
        <follow></follow>
      </van-tab>

      <van-tab title="登录">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="check_status">获取个人信息</el-button>
        <el-button type="primary" @click="login_out">登出</el-button>
        <el-button
          class="song"
          :to="{ name: 'Player', params: { id: 347230 } }"
        >
          0000
        </el-button>
        <!-- <router-link :to="{ name:"Player", query:{id: 347230 }}">999 <router-link> -->
        <router-link :to="{ name: 'Player', query: { id: 347230 } }"
          >我要去听歌</router-link
        >
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import topbar from "@/views/Topbar";
import hotwall from "@/views/Yuncun/hotwall";
import follow from "@/views/Yuncun/follow";
import { setuid, removeuid } from "@/utils/tools";

import { loginAPI, statusAPI, loginoutAPI } from "@/api/yuncun";
export default {
  data() {
    return {
      // activeName: "second",
    };
  },

  methods: {
    async login() {
      const u = await loginAPI();
      // console.log(u);
      console.log(u.account.id);
      setuid(u.account.id);
    },
    async check_status() {
      const uu = await statusAPI();
      console.log(uu);
    },
    async login_out() {
      const log_out = await loginoutAPI();
      console.log(log_out);
      removeuid();
    },
  },
  components: {
    topbar,
    hotwall,
    follow,
  },
};
</script>

<style scoped>
</style>
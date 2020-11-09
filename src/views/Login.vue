<template>
  <div class="login">
    <!-- 网易云图片logo -->
    <el-image
      :src="LoginSrc"
      style="
        width: 18.75%;
        border-radius: 20px;
        border: none;
        top: 16.6%;
        left: 40%;
      "
    >
    </el-image>
    <!-- 请输入用户名文本框 -->
    <el-input
      v-model="username"
      placeholder="请输入用户名"
      style="width: 80%; height: 30px; margin-left: 10%; margin-top: 55%"
    />
    <!-- 请输入密码文本框 -->
    <el-input
      v-model="password"
      placeholder="请输入密码"
      style="width: 80%; height: 30px; margin-left: 10%; margin-top: 5%"
    />
    <!-- 登录按钮 -->
    <el-button
      round
      style="width: 80%; margin: 5% 10% 0; border: none; color: #dd2d20"
      @click="loginBtn"
      >一键登录</el-button
    >
    <!-- 立即体验按钮 -->
    <el-button
      round
      style="
        border: 1px solid #f46658;
        background: #dd2d20;
        width: 80%;
        margin: 5% 10% 0;
        color: #fff;
      "
      type="danger"
      plain
      >立即体验</el-button
    >
    <!-- 第三方登录链接，写成了图片 -->
    <el-image :src="social" style="width: 80%; margin: 5% 10% 0" alt="" />
    <!-- 同意协议 -->
    <el-row :gutter="10" style="margin-top: 5%">
      <el-col :xs="4" :sm="4" :md="4"
        ><div class="grid-content bg-purple">
          <el-checkbox v-model="checked">同意</el-checkbox>
        </div></el-col
      >
      <el-col :xs="6" :sm="6" :md="8"
        ><div class="grid-content bg-purple-light item">
          《用户协议》
        </div></el-col
      >
      <el-col :xs="6" :sm="6" :md="8"
        ><div class="grid-content bg-purple-light item">
          《隐私政策》
        </div></el-col
      >
      <el-col :xs="8" :sm="6" :md="8"
        ><div class="grid-content bg-purple-light item">
          《儿童隐私政策》
        </div></el-col
      >
    </el-row>
    <el-row style="text-align: center"> 《中国联通认证服务协议》 </el-row>
  </div>
</template>

<script>
// import axios from "axios";
import { loginAPI } from "@/api/login";
export default {
  data() {
    return {
      username: "",
      password: "",
      checked: false,
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      LoginSrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604677477425&di=0580076701e7033b82b291c33bf85a78&imgtype=0&src=http%3A%2F%2Fis3.mzstatic.com%2Fimage%2Fthumb%2FPurple128%2Fv4%2Ff5%2F44%2F5a%2Ff5445a87-4137-85ba-06d8-26d33e54d404%2Fmzl.sqdgtzfe.png%2F512x512bb.jpg",
      social: require("@/assets/LoginReg/social.png"), //本地图片路径
    };
  },

  methods: {
    async loginBtn() {
      const res = await loginAPI(this.username, this.password);

      if (res.code == 200) {
        console.log(res);
        console.log(res.account.id);
        localStorage.setItem("uid", res.account.id);
        // 存到localstro里
      } else {
        console.log(res.msg);
      }
    },
  },
};
</script>

<style scoped>
body {
  position: relative;
}
.login {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background: #dd2d20;
}
/* 同意协议 */
.el-row {
  margin: 0% 10% 0% 10%;
  font-size: 10px;
  color: #ffd1d7;
}
.grid-content[data-v-26084dc2] {
  min-height: 24px;
}
.el-col {
  /* border-radius: 4px; */
}
.bg-purple-dark {
  /* background: #99a9bf; */
}
.bg-purple {
  /* background: #d3dce6; */
  color: #db4439;
}
.bg-purple-light {
  /* background: #e5e9f2; */
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
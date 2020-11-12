<template>
  <div class="login">
    <!-- 网易云图片logo -->
    <el-image
      :src="LoginSrc"
      style="
        width: 18.75%;
        border-radius: 20px;
        border: none;
        top: 13%;
        left: 40%;
      "
    >
    </el-image>
    <!-- 请输入用户名文本框 -->
    <el-input
      v-model="tel"
      placeholder="请输入手机号"
      style="width: 80%; height: 30px; margin-left: 10%; margin-top: 30%"
    />
    <!-- 请输入密码文本框 -->
    <el-input
      v-model="password"
      placeholder="请输入密码"
      style="width: 80%; height: 30px; margin-left: 10%; margin-top: 5%"
    />
    <el-input
      v-model="captcha"
      placeholder="请输入验证码"
      style="width: 80%; height: 30px; margin-left: 10%; margin-top: 5%"
    />
    <el-input
      v-model="nickname"
      placeholder="请输入昵称"
      style="width: 80%; height: 30px; margin-left: 10%; margin-top: 5%"
    />
    <!-- 登录按钮 -->
    <el-button
      @click="RegBtn"
      round
      style="width: 80%; margin: 5% 10% 0; border: none; color: #dd2d20"
      >立即注册</el-button
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
      <el-col :xs="4" :sm="4" :md="4" style="margin-left: 20px"
        ><div class="grid-content bg-purple">
          <el-checkbox v-model="checked">同意</el-checkbox>
        </div></el-col
      >
      <el-col :xs="6" :sm="6" :md="8"
        ><div class="grid-content bg-purple-light item">
          《用户协议》
        </div></el-col
      >
      <el-col :xs="6" :sm="6" :md="8" style="margin: 0 -10px 0 -10px"
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
import { Notify } from "vant";
import { RegAPI } from "@/api/login";
export default {
  data() {
    return {
      tel: "",
      password: "",
      captcha: "",
      nickname: "",
      checked: false,
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      LoginSrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604677477425&di=0580076701e7033b82b291c33bf85a78&imgtype=0&src=http%3A%2F%2Fis3.mzstatic.com%2Fimage%2Fthumb%2FPurple128%2Fv4%2Ff5%2F44%2F5a%2Ff5445a87-4137-85ba-06d8-26d33e54d404%2Fmzl.sqdgtzfe.png%2F512x512bb.jpg",
      social: require("@/assets/LoginReg/social.png"), //本地图片路径
    };
  },
  methods: {
    // 注册需要4个参数，tel：手机号，password：密码，captcha：验证码，nickname：昵称
    // const res = await RegAPI(this.username, this.password);
    // RegBtn() {
    //   console.log(this.tel, this.password, this.captcha, this.nickname);
    // },
    async RegBtn() {
      // 判断手机号和密码不为空
      if (
        this.tel != "" &&
        this.password != "" &&
        this.captcha != "" &&
        this.nickname != ""
      ) {
        let tel = /^1(3|4|5|6|7|8|9)\d{9}$/;
        //判断用户输入的是手机号
        // let email = /^\w+@\w+(\.\w+)+$/;
        if (tel.test(this.tel)) {
          // 判断用户是否勾选用户条例
          if (this.checked) {
            const res = await RegAPI(
              this.tel,
              this.password,
              this.captcha,
              this.nickname
            );
            console.log(res.code);
            console.log(res);
            // 判断手机号密码是否正确
            if (res.code == 200) {
              // 判断他是否已经登录
              if (localStorage.getItem("uid") == res.account.id) {
                Notify("您已经登录,不能重复登录");
                this.$router.push({ name: "Mine" });
                //
              } else {
                // 否则，把res.account.id存到localStorage
                localStorage.setItem("uid", res.account.id);
                this.$router.push({ name: "Mine" });
              }
              // localStorage
            } else {
              // 报错
              console.log(res.msg);
              Notify(res.msg);
            }
          } else {
            Notify("请同意用户条例");
          }
        } else {
          Notify("请输入正确的手机号");
        }
      } else {
        Notify("输入框不能为空");
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

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
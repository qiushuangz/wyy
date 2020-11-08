<template>
  <div class="mine">
    <topbar></topbar>
    <div class="login">
      <van-icon
        class="icon"
        color="pink"
        size="10vw"
        name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
      />
      <span>立即登录 &gt;</span>
    </div>
    <div class="list">
      <el-row>
        <el-col
          :span="6"
          v-for="(o, index) in 8"
          :key="o"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img src="" class="image" />
            <div style="padding: 14px">
              <span>好吃的汉堡</span>
              <!-- <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div> -->
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topbar from "@/views/Topbar";
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  components: {
    topbar,
  },
};
</script>

<style scoped>
.mine {
  /* padding: 6vw; */
}
.login {
  height: 10vw;
}
.icon {
  margin-top: -5vw;
  display: inline-block;
}
.login p {
  display: inline-block;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
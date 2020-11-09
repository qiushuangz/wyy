<template>
  <div class="follow">
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
  </div>
</template>

<script>
import { gettrendsAPI } from "@/api/yuncun";
import { getuid } from "@/utils/tools";
import { Notify } from "vant";

export default {
  //取出数据
  name: "follow",
  async created() {
    if (getuid()) {
      let res = await gettrendsAPI({ uid: getuid() });
      console.log(res);
    } else {
      Notify("请登录");
      this.$router.push({ name: "Login" });
    }
  },
  data() {
    return {
      conn: 0,
    };
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
<template>
  <div class="find">
    <!-- 导航条 -->
    <topbar></topbar>
    <!-- banner -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in bannerRes" :key="index">
        <img
          style="width: 92%; margin: 10px 0 0 4%; border-radius: 10px"
          :src="item.imageUrl"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <el-carousel type="card" height="50px;">
      <el-carousel-item v-for="item in 6" :key="item">
        <div class="medium1">{{ item }}</div>
      </el-carousel-item>
    </el-carousel>

    <!-- 不可错过的欧美金曲 -->
    <van-panel title="不可错过的欧美金曲" status="全部播放">
      <!-- <div>内容</div> -->
    </van-panel>
    <van-card
      v-for="item in unmissable"
      :key="item.artistId"
      :desc="item.briefDesc"
      :title="item.name"
      :thumb="item.cover"
    />
    <!-- 忙碌暂停音乐play -->
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item
        style="width: 100px"
        v-for="item in busy"
        :key="item.artistId"
      >
        <img
          :src="item.cover"
          alt=""
          style="width: 80px;height:80px padding: 0 15px; border-radius: 5px"
        />
        {{ item.name.substring(0, 8) }}
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import topbar from "@/views/Topbar";
// import { Notify } from "vant";
// 轮播图api，音乐日历api
import { bannerAPI, unmissableAPI, busyAPI } from "@/api/find";

export default {
  data() {
    return {
      // banner图片
      bannerRes: [],
      // 导航
      navRes: [],
      // 不可错过的音乐
      unmissable: [],
      // 忙碌暂停音乐play
      busy: [],
    };
  },
  components: {
    topbar,
  },
  methods: {},
  async created() {
    // 轮播图
    const banRes = await bannerAPI();
    this.bannerRes = banRes.banners;
    const unmissable = await unmissableAPI();
    this.unmissable = unmissable.data;
    const busy1 = await busyAPI();
    this.busy = busy1.data;

    console.log(busy1);
    this.busy.length = 20; //限制返回的数据长度
    console.log(this.busy);
  },
};
</script>

<style scoped>
.van-card {
  height: 80px;
  padding: 1px 16px;
}
.van-card__thumb {
  width: 66px;
  height: 66px;
}
/* div{
  border-radius: ;
} */
.el-carousel,
.el-carousel__container,
.el-carousel--card,
.el-carousel__item,
.el-carousel__item--card {
  height: 100px;
}
</style>
<template>
  <div class="find">
    <!-- 导航条 -->
    <van-sticky>
      <topbar></topbar>
    </van-sticky>
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
    <van-swipe
      class="my-swipe"
      indicator-color="white"
      style="margin-top: 20px"
    >
      <van-swipe-item
        style="width: 100px"
        v-for="item in navRes"
        :key="item.id"
      >
        <img
          :src="item.img"
          alt=""
          style="width: 60px;height:60px padding: 0 10px; display:block;margin:0 auto"
        />
        <div style="text-align: center; margin-top: 10px">{{ item.name }}</div>
      </van-swipe-item>
    </van-swipe>
    <!-- 不可错过的欧美金曲 -->
    <router-link :to="{ name: 'UnFindAll' }">
      <van-panel title="不可错过的欧美金曲" status="全部播放"></van-panel
    ></router-link>
    <!-- <div>内容</div> -->

    <!-- 跳转至播放歌曲页面 -->
    <router-link
      :to="{ name: 'Player', query: { id: item.artistId } }"
      :key="item.artistId"
      v-for="item in unmissable"
    >
      <van-card :desc="item.briefDesc" :title="item.name" :thumb="item.cover"
    /></router-link>
    <!-- 忙碌暂停音乐play -->

    <router-link :to="{ name: 'UnFindAll' }">
      <van-panel title="忙碌暂停音乐play" status="查看更多"> </van-panel>
    </router-link>
    <van-swipe class="my-swipe" indicator-color="white">
      <router-link
        v-for="item in busy"
        :key="item.artistId"
        :to="{ name: 'Player', query: { id: item.artistId } }"
      >
        <van-swipe-item style="width: 100px">
          <img
            :src="item.cover"
            alt=""
            style="width: 80px;height:80px padding: 0 15px; border-radius: 5px"
          />
          <div style="color: #333">{{ item.name.substring(0, 20) }}</div>
        </van-swipe-item></router-link
      >
    </van-swipe>
  </div>
</template>

<script>
import topbar from "@/views/Topbar";
// import { Notify } from "vant";
// 轮播图api，音乐日历api
import { bannerAPI, unmissableAPI, busyAPI, findAPI } from "@/api/find";

export default {
  data() {
    return {
      // banner图片
      bannerRes: [],

      // 不可错过的音乐
      unmissable: [],
      // 忙碌暂停音乐play
      busy: [],

      // 导航，需要加图片
      //  topImg: require("../assets/sidebar/sidebar.png"),
      navRes: [
        {
          id: "1",
          img: require("../assets/find/shuzizhuanji.png"),
          name: "每日推荐",
        },
        {
          id: "2",
          img: require("../assets/find/siren.png"),
          name: "私人FM",
        },
        {
          id: "3",
          img: require("../assets/find/gedan.png"),
          name: "歌单",
        },
        {
          id: "4",
          img: require("../assets/find/paihangbang.png"),
          name: "排行榜",
        },
        {
          id: "5",
          img: require("../assets/find/zhibo.png"),
          name: "直播",
        },
        {
          id: "6",
          img: require("../assets/find/diantai.png"),
          name: "电台",
        },
        {
          id: "7",
          img: require("../assets/find/shuzizhuanji.png"),
          name: "数字专辑",
        },
        {
          id: "8",
          img: require("../assets/find/changliao.png"),
          name: "唱聊",
        },
        {
          id: "9",
          img: require("../assets/find/youxizhuanqu.png"),
          name: "游戏专区",
        },
      ],
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
    this.unmissable.length = 10;
    console.log(this.unmissable);
    const busy1 = await busyAPI();
    this.busy = busy1.data;
    this.busy.length = 20; //限制返回的数据长度
    const findRes = await findAPI();
    console.log(findRes);
    console.log(findRes.data);
    console.log(findRes.data.blocks[0].creatives[0]);
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
.van-panel__header {
  margin-top: 20px;
}
.van-cell__title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 5px;
}
.el-carousel,
.el-carousel__container,
.el-carousel--card,
.el-carousel__item,
.el-carousel__item--card {
  height: 100px;
}
.van-swipe-item {
  font-size: 12px;
}
</style>
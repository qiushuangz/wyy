<template>
  <div id="app">
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      name="viewport"
    />
    <!-- route 表示底部导航可以实现跳转功能 -->
    <!--     @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata" -->
    <audio
      :src="song_url"
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      autoplay
    ></audio>
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import { mapState } from "vuex"; // mapState可以把vuex中的数据映射到计算属性
export default {
  computed: {
    ...mapState([
      "song_url",
      "sliderTime",
      "playing",
      "maxTime",
      "currentTime",
      "Timeupdate",
    ]),
  },
  data() {
    return {};
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.playing = false;
    },

    //传出去总时长的值，单位秒
    onLoadedmetadata(res) {
      this.$store.commit("set_maxTime", parseInt(res.target.duration));
    },
    // 当前播放位置和滑块位置
    onTimeupdate(res) {
      //当前播放的位置，单位秒
      this.$store.commit("set_Timeupdate", res.target.currentTime);
    },
  },

  watch: {
    song_url(v) {
      console.log(v);
      console.log("播放地址改变");
    },
    playing(v) {
      console.log("播放状态改变" + v);
      this.startPlayOrPause();
    },
    currentTime(v) {
      console.log("那边拖动进度条了");
      this.$refs.audio.currentTime = parseInt((v / 100) * this.maxTime);
    },
  },
};
</script>
<style>
.icon_top {
  margin: 1rem 0.5rem 0 0.5rem;
}
.van-tabbar-item span {
  font-size: 4vw;
  font-weight: 900;
}
</style>

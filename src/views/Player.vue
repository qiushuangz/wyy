<template>
  <div class="player">
    <div
      class="player_top"
      :style="{ backgroundImage: 'url(' + now_song.picUrl + ')' }"
    ></div>
    <div class="top">
      <div class="before">
        <!-- <router-link :to="{ name: 'Player', query: { id: 347230 } }"> -->
        <i class="el-icon-back" @click="back"></i>
        <!-- </router-link> -->
      </div>
      <div class="song">
        <div class="song_name">{{ now_song.name }}</div>
        <div class="song_user">{{ now_song.singer }}</div>
      </div>
    </div>
    <div class="mid">
      <div class="mid_big" :style="{ backgroundImage: 'url(' + imgbig + ')' }">
        <div class="mid_s">
          <img :src="now_song.picUrl" alt="" />
        </div>
      </div>
    </div>

    <div class="bootm">
      <div class="bottom_1">
        <van-icon name="like-o" size="2em" />
        <a :href="now_song.palyUrl" target="_blank" class="download" download>
          <van-icon name="down" size="2em"
        /></a>

        <van-icon name="comment-o" size="2em" />
      </div>
      <!-- @timeupdate="onTimeupdate"
          @loadedmetadata="onLoadedmetadata" -->
      <div class="bottom_2">
        <audio
          :src="now_song.playurl"
          ref="audio"
          @pause="onPause"
          @play="onPlay"
          @timeupdate="onTimeupdate"
          @loadedmetadata="onLoadedmetadata"
          autoplay
        ></audio>
        <span type="info">{{ audio.currentTime | formatSecond }}</span>
        <!-- 进度条ui -->
        <el-slider
          size="mini"
          color="red"
          v-model="sliderTime"
          :format-tooltip="formatProcessToolTip"
          @change="changeCurrentTime"
          class="slider"
        ></el-slider>
        <span type="info">{{ audio.maxTime | formatSecond }}</span>
      </div>
      <div class="bottom_3">
        <i class="el-icon-share"></i>
        <i class="el-icon-d-arrow-left"></i>
        <i
          :class="audio.playing ? 'el-icon-video-pause' : 'el-icon-video-play'"
          @click="startPlayOrPause"
        ></i>
        <!-- <i class="el-icon-video-pause"></i> -->
        <i class="el-icon-d-arrow-right"></i>
        <i class="el-icon-s-unfold"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getsongAPI, geturlAPI } from "@/api/player";
// import vueaudio from "@/views/Player/VueAudio"
// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return (
      // hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
      ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}
export default {
  name: "MuPlayer",
  data() {
    return {
      imgbig: require("../assets/player/cangpian.jpg"),
      now_song: {},
      songid: 347230,
      sliderTime: 0,
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
      },
    };
  },
  async created() {
    this.songid = this.$route.query.id;
    console.log(this.songid);
    let res = await getsongAPI({ ids: this.songid });
    let res_url = await geturlAPI({ id: this.songid });
    const d = {};
    d.playurl = res_url.data[0].url;
    d.name = res.songs[0].name;
    d.picUrl = res.songs[0].al.picUrl;
    d.singer = res.songs[0].ar[0].name;
    this.now_song = d;
    // this.$refs.audio.src = this.now_song.playurl;
    console.log(this.now_song);
  },
  mounted() {
    // 播放音频
    // this.startPlayOrPause();
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      console.log("ok");
      console.log(this.audio.playing);
      return this.audio.playing ? this.pause() : this.play();
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
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // onTimeupdate(res) {
    //   console.log("timeupdate");
    //   console.log(res);
    //   this.audio.currentTime = res.target.currentTime;
    // },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      console.log(res);
      this.audio.maxTime = parseInt(res.target.duration);
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      console.log("timeupdate");
      console.log(res);
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },

    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return realFormatSecond(index);
      // return "进度条: " + realFormatSecond(index);
    },
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
};
</script>

<style scoped>
.top {
  height: 8vh;
  display: flex;
  align-items: center;
}
.player_top {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  filter: grayscale(10%) blur(10px) contrast(20%) brightness(90%);
  z-index: -9;
  position: absolute;
}
.mid {
  width: 100vw;
  height: 70vh;
  z-index: 5;
  /* background-color: rgb(70, 60, 60); */
  display: flex;
  justify-content: center;
  align-items: center;
}
.mid .mid_big {
  width: 70vw;
  height: 70vw;
  background-size: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2vw solid rgba(228, 220, 220, 0.4);
}
.mid .mid_big .mid_s {
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mid .mid_big .mid_s img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.bottom_1 {
  height: 6vh;
  border: solid 1px rgb(204, 38, 38);
  display: flex;
  font-size: 3.5vw;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom_1 i {
  display: block;
}

.bottom_2 {
  height: 6vh;
  border: solid 1px #777;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-slider {
  width: 70vw;
  color: red;
}
.bottom_2 span {
  color: white;
  font-size: 3vw;
}
.bottom_3 {
  height: 10vh;
  display: flex;
  justify-content: space-around;
}
.bottom_3 i {
  color: white;
  display: block;
  font-size: 10vw;
}

.before i {
  line-height: 1;
  display: block;
  font-size: 10vw;
  color: white;
}
.song {
  margin-left: 3vw;
}
.song_name {
  font-size: 5vw;

  color: white;
  font-weight: 900;
}
.song_user {
  font-size: 3.5vw;
  color: #afaaa3;
}
.download:visited {
  color: white;
}
/*
.mid .mid_big .mid_s{
  position: relative;
}
.mid .mid_big .mid_s img{
  width: 70%;
  height: 70%;
  position: absolute;
} */
</style>
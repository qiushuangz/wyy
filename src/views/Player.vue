<template>
  <div class="player">
    <div
      class="player_top"
      :style="{ backgroundImage: 'url(' + now_song.picUrl + ')' }"
    ></div>
    <div class="top">
      <div class="before">
        <i class="el-icon-back" @click="back"></i>
      </div>
      <div class="song">
        <div class="song_name">{{ now_song.name }}</div>
        <div class="song_user">{{ now_song.singer }}</div>
      </div>
    </div>
    <div class="mid">
      <div
        :class="animt"
        :style="{ backgroundImage: 'url(' + imgbig + ')' }"
        ref="midpic"
      >
        <div class="mid_s">
          <img :src="now_song.picUrl" alt="" />
        </div>
      </div>
    </div>
    <div class="bootm">
      <div class="bottom_1">
        <van-icon
          name="like"
          size="2em"
          :class="like ? 'red' : 'white'"
          @click="addlike"
        />
        <a :href="now_song.palyUrl" class="download">
          <van-icon name="down" size="2em"
        /></a>
        <router-link
          style="position: relative"
          :to="{
            name: 'comment',
            query: {
              id: now_song.id,
              pic: now_song.picUrl,
              song_name: now_song.name,
              song_singer: now_song.singer,
              song_total: now_song.total,
            },
          }"
        >
          <van-icon name="comment-o" size="2em" color="white" />
          <span class="total_um">{{ now_song.total }}</span>
        </router-link>
      </div>
      <!-- @timeupdate="onTimeupdate"
          @loadedmetadata="onLoadedmetadata" -->
      <div class="bottom_2">
        <span type="info">{{ Timeupdate | formatSecond }}</span>
        <!-- @change="changeCurrentTime" -->
        <!-- :format-tooltip="formatProcessToolTip" -->
        <!-- v-model="sliderTime" -->
        <el-slider
          @change="changeCurrentTime"
          class="slider"
          v-model="slider"
        ></el-slider>
        <span type="info">{{ maxTime | formatSecond }}</span>
      </div>
      <div class="bottom_3">
        <i class="el-icon-share"></i>
        <i class="el-icon-d-arrow-left" @click="back_song"></i>
        <i
          :class="isplaying ? 'el-icon-video-play' : 'el-icon-video-pause'"
          @click="startPlayOrPause"
          style="font-size: 14vw"
        ></i>
        <i class="el-icon-d-arrow-right" @click="next_song"></i>
        <i class="el-icon-s-unfold"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
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
//  addlikeAPI,
import {
  getsongAPI,
  geturlAPI,
  getcommentAPI,
  likemusicAPI,
  addlikeAPI,
} from "@/api/player";
export default {
  computed: {
    ...mapState([
      "song_url",
      "sliderTime",
      "audio",
      "index",
      "maxTime",
      "currentTime",
      "Timeupdate",
      "song_list",
    ]),
  },
  data() {
    return {
      now_song: {},
      //唱片图
      imgbig: require("../assets/player/cangpian.jpg"),
      //是否喜欢这首歌
      like: false,
      isplaying: false,
      slider: 0,
      animt: "",
      conn: 0,
    };
  },
  /////////////////////////////
  methods: {
    //上一曲
    back_song() {
      this.conn--;
      let back_id = this.song_list[this.conn];
      this.getsonginfo(back_id);
    },
    //下一曲
    next_song() {
      this.conn++;
      let next_id = this.song_list[this.conn];
      this.getsonginfo(next_id);
    },
    //拖动进度条callback当前推动的位置
    changeCurrentTime(index) {
      this.$store.commit("set_currentTime", index);
    },
    //喜欢或者取消喜欢音乐
    async addlike() {
      this.like = !this.like;
      let res = await addlikeAPI({ id: this.songid, like: this.like });
      console.log(res);
      if (res.code == 200) {
        if (this.like) {
          Toast.success("已添加到我的喜欢");
        } else {
          Toast("已取消喜欢");
        }
      }
    },
    //返回上一层路由
    back() {
      this.$router.go(-1);
    },
    //播放或者暂停音乐
    startPlayOrPause() {
      this.isplaying = !this.isplaying;
      console.log(this.isplaying);
      this.$store.commit("set_playing", this.isplaying);
      if (this.isplaying) {
        this.animt = "mid_big state";
      } else {
        this.animt = "mid_big";
      }
    },
    async getsonginfo(idd) {
      let res = await getsongAPI({ ids: idd });
      let res_url = await geturlAPI({ id: idd });
      let res_comment = await getcommentAPI({ id: idd });
      let res_like = await likemusicAPI({
        id: idd,
        timestamp: new Date().getTime(),
      });
      this.now_song = {
        id: idd,
        like_all: res_like.ids,
        playurl: res_url.data[0].url,
        name: res.songs[0].name,
        picUrl: res.songs[0].al.picUrl,
        singer: res.songs[0].ar[0].name,
        total: res_comment.total,
      };
      if (this.now_song.like_all.indexOf(Number(idd)) >= 0) {
        this.like = true;
      }
      this.$store.commit("set_url", this.now_song.playurl);
    },
  },
  ///////////////////////////////////
  async created() {
    this.animt = "mid_big";
    if (this.$route.query.id) {
      this.songid = this.$route.query.id;
      this.getsonginfo(this.songid);
    } else {
      console.log(this.song_list);
      this.getsonginfo(this.song_list[0]);
    }
  },
  /////////////////////////////////////////

  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
  },
  watch: {
    Timeupdate() {
      this.slider = parseInt((this.Timeupdate / this.maxTime) * 100);
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
  /* border: solid 1px rgb(204, 38, 38); */
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
  /* border: solid 1px #777; */
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
  align-items: center;
}
.bottom_3 i {
  color: white;
  display: block;
  font-size: 10vw;
}

.before i {
  line-height: 1;
  display: block;
  font-size: 8vw;
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
.total_um {
  font-size: 1vw;
  color: white;
  padding: 0.5vw;
  display: block;
  border-radius: 1.5vw;
  position: absolute;
  top: -2vw;
  left: 4vw;
  background-color: rgba(190, 180, 180, 0.8);
}
.red {
  color: red;
}
.white {
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
.mid_big {
  animation-name: myfirst;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  /* text-align: center; */
}
@keyframes myfirst {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.state {
  animation-play-state: paused;
}
/* ///////// */
</style>
<template>
  <div class="detailList">
    <div class="detailList_d">
      <div class="top" style="width: 100%; position: relative">
        <div
          class="top_t"
          style="width: 100vw; height: 100vw"
          :style="{ backgroundImage: 'url(' + coverImgUrl + ')' }"
        ></div>
        <div
          src="../assets/mine/tubiao/gengduo.png"
          style="
            display: flex;
            justify-content: space-between;
            padding: 4vw 6vw;
            color: #fff;
          "
        >
          <el-page-header size="6vw" @back="goBack" color="#fff">
          </el-page-header>
          <span>
            <van-icon name="search" size="6vw" />
            <img
              src="../assets/mine/tubiao/gengduo1.png"
              style="
                padding-top: -1vw;
                margin-left: 3vw;
                width: 5vw;
                height: 5vw;
                display: inline-block;
              "
              alt=""
            />
          </span>
        </div>
        <div
          class="person"
          style="
            display: flex;
            align-item: center;
            justify-content: spaced-around;
            margin-left: 6vw;
            color: #fff;
          "
        >
          <div
            class="left"
            style="width: 31vw; height: 31vw; background: black"
          >
            <img :src="coverImgUrl" alt="" style="width: 100%; height: 100%" />
          </div>
          <div class="right" style="margin-left: 5vw">
            <p>{{ name }}</p>
            <span style="display: flex; align-tem: center">
              <img :src="photo" class="icon" />
              <span style="margin-top: 2vw; margin-left: 4vw"
                >{{ chara }} <span>&gt;</span></span
              >
            </span>
            <p style="font-size: 3vw">编辑信息</p>
          </div>
        </div>
        <div
          class="static"
          style="display: flex; justify-content: space-around; color: #fff"
        >
          <dl>
            <dt><van-icon name="orders-o" /></dt>
            <dd style="margin-left: -1.6vw; margin-top: 3vw; font-size: 3vw">
              评论
            </dd>
          </dl>
          <dl>
            <dt class="el-icon-share"></dt>
            <dd style="margin-left: -1.6vw; margin-top: 3vw; font-size: 3vw">
              分享
            </dd>
          </dl>

          <dl>
            <dt class="el-icon-download"></dt>
            <dd style="margin-left: -1.6vw; margin-top: 3vw; font-size: 3vw">
              下载
            </dd>
          </dl>
          <dl>
            <dt><van-icon name="completed" /></dt>
            <dd style="margin-left: -1.6vw; margin-top: 3vw; font-size: 3vw">
              多选
            </dd>
          </dl>
        </div>
      </div>
      <div class="content">
        <div
          style="
            height: 60vh;
            width: 100%;
            background: #fff;
            border-radius: 3vw;
            margin-top: -1vh;
          "
        >
          <div style="line-height: 12vw; margin-left: 6vw">
            <i class="el-icon-video-play"></i>
            <span @click="jump" style="margin-left: 6vw"
              >播放全部(共{{ listlength }}首)</span
            >
          </div>
          <div v-for="(i, index) in detail" :key="i.id">
            <div
              class="item"
              @click="playEvent(i.id)"
              style="display: flex; justify-content: space-between"
            >
              <div style="display: flex; align-item: center">
                <div
                  class="left"
                  style="
                    width: 20vw;
                    height: 20vw;
                    background: white;
                    display: inline-block;
                    line-height: 20vw;
                    text-align: center;
                  "
                >
                  {{ index + 1 }}
                </div>

                <div
                  class="center"
                  style="
                    display: flex;
                    align-item: center;
                    flex-direction: column;
                    justify-content: center;
                  "
                >
                  <span
                    style="
                      font-size: 4vw;
                      overflow: hidden;
                      width: 55vw;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                    >{{ i.song_name }}</span
                  >
                  <p style="font-size: 2.5vw">{{ i.song_singer }}</p>
                </div>
              </div>
              <div class="right" style="margin-top: 6vw; margin-right: 6vw">
                <i class="el-icon-video-play"></i>
                <img
                  src="../assets/mine/tubiao/gengduo.png"
                  style="
                    margin-left: 3vw;
                    width: 5vw;
                    height: 5vw;
                    display: inline-block;
                  "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { mineApi } from "@/api/mine.js";
import { getuid } from "@/utils/tools.js";
import { userSongCountApi } from "@/api/userDetail.js";
import { detailListApi, copy } from "@/api/detailList.js";

export default {
  data() {
    return {
      array: [],
      likeList: [],
      createArray: [],
      addArray: [],
      addLength: "0",
      list: "0", //歌单
      chara: "请登录",
      coverImgUrl: "",
      photo: "../assets/mine/tubiao/denglu.png",
      info: {},
      id: "",
      name: "",
      listlength: "0",
      detail: [],
      detailId: [],
    };
  },
  name: "detaillist",
  methods: {
    goBack() {
      this.$router.push({
        name: "Mine",
      });
    },
    async playEvent(v) {
      // console.log(v);
      const res = await copy({ id: v });
      console.log(res.message);
      if (res.success == true) {
        this.$router.push({
          name: "Player",
          query: {
            id: v,
          },
        });
      } else {
        Toast({
          message: "亲爱的，暂无版权",
          icon: "like-o",
        });
      }
      console.log(res);
    },
    jump() {
      if (this.detailId.length != 0) {
        this.$router.push({
          name: "Player",
        });
        this.$store.commit("replace_song", this.detailId);
      }
    },
  },
  async created() {
    const userSongCount = await userSongCountApi({ uid: getuid() });
    this.array = userSongCount.playlist;
    this.likeList = this.array.splice(0, 1);
    this.array.forEach((item) => {
      if (item.userId == getuid()) {
        this.createArray.push(item);
      } else {
        this.addArray.push(item);
      }
    });
    this.list = this.createArray.length;
    this.addLength = this.addArray.length;

    ////////////////////

    //////////////////////////////////
    //头像和名字
    const resinfo = await mineApi({ uid: getuid() });
    this.info = resinfo;
    this.photo = this.info.profile.avatarUrl;
    this.chara = this.info.profile.nickname;
    ////////////////
    //console.log(this.$route.query.id);
    // console.log(this.$route.query);
    // console.log(this.$route.query.coverImgUrl);
    this.id = this.$route.query.id;
    this.coverImgUrl = this.$route.query.coverImgUrl;
    this.name = this.$route.query.name;
    //console.log(this.id);

    const list = await detailListApi({ id: this.id });
    this.listlength = list.playlist.tracks.length;
    // console.log(list[0].pc.fn);
    //  console.log(list.playlist.tracks[1].pc.fn);
    //console.log(list.playlist.tracks[0].id);
    //console.log(this.detail);
    for (let i in list.playlist.tracks) {
      //  console.log(i);
      // this.detail[i].song_name = list.playlist.tracks[i].name;
      // this.detail[i].song_singer = list.playlist.tracks[i].ar[0].name;
      this.detail.push({
        id: list.playlist.tracks[i].id,
        song_name: list.playlist.tracks[i].name,
        song_singer: list.playlist.tracks[i].ar[0].name,
      });
      console.log(list.playlist.tracks[i].id);
      this.detailId.push(list.playlist.tracks[i].id);
    }
    // for (let i in this.detail) {
    //   const message = await copy({ id: this.detail[i].id });
    //   console.log(message);
    // }

    console.log(this.detailId);
    this.$store.commit("replace_song", this.detailId);
    console.log(this.detail[0].song_name);
  },
};
</script>

<style scoped>
.detailList_d {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.content {
  flex: 1;
  width: 100%;
  border-radius: 3vw;
}
.icon {
  width: 10vw;
  border-radius: 10vw;
}
.top_t {
  background-size: 100% 100%;
  filter: grayscale(10%) blur(10px) contrast(20%) brightness(90%);
  z-index: -9;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
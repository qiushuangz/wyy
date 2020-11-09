<template>
  <div class="userDetail">
    <div
      class="up"
      :style="{ 'background-image': 'url(' + backgroundUrl + ')' }"
    >
      <div class="top">
        <div class="top_t">
          <van-icon name="arrow-left" @click-left="last" />
          <van-icon class="el-icon-share" size="8vw" />
        </div>
        <img :src="photo" style="padding: 6vw" class="icon" alt="" />
      </div>
      <div class="content">
        <div class="left">
          <p>{{ chara }}</p>
        </div>
        <div class="right">
          <van-button class="bg" round type="info">编辑</van-button>
          <van-button round class="bg" type="info">更换背景</van-button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-tabs v-model="active">
        <van-tab title="主页">
          <div class="music">
            <div>
              <img src="@/assets/mine/tubiao/woxihuan.png" alt="" />
            </div>
            <div class="like">
              <p>我喜欢的音乐</p>
              <p class="small">{{ count }}首</p>
            </div>
          </div>
          <div class="music">
            <div>
              <img src="@/assets/userDetail/rant.png" alt="" />
            </div>
            <div class="like">
              <p>听歌排行</p>
              <p class="small">{{ listensongs }}首</p>
            </div>
          </div>
          <div class="create">
            <h3>
              创建歌单
              <p>({{ list }}个，被收藏{{ add }}次)</p>
            </h3>
            <h6>更多歌单</h6>
          </div>
          <div class="music" v-for="item in createArray" :key="item.id">
            <div>
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="like">
              <p>{{ item.name }}</p>
              <p class="small">
                {{ item.trackCount }}首,播放{{ item.playCount }}次
              </p>
            </div>
          </div>
          <div class="create">
            <h3>
              收藏歌单
              <p>({{ addLength }}个)</p>
            </h3>
            <h6>更多歌单</h6>
          </div>
          <div class="music" v-for="item in addArray" :key="item.id">
            <div>
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="like">
              <p>{{ item.name }}</p>
              <p class="small">
                {{ item.trackCount }}首,by{{ item.creator.nickname }}
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab title="动态">
          <div class="move" v-for="item in reEvent" :key="item.id">
            <div>
              <img :src="photo" style="padding: 6vw" class="icon1" alt="" />
            </div>

            <div class="right" style="margin-top: 8vw">
              <span style="margin-top: 8vw">{{ chara }}</span>
              <span></span>
              <span style="margin-top: 8vw; font-size: 4vw" class="share">
                分享单曲:
              </span>
              <div class="moveList">
                <p>{{ item.msg }}</p>
                <div class="music">
                  <div>
                    <img :src="item.song.album.picUrl" alt="" />
                  </div>
                  <div class="like">
                    <p>{{ item.song.name }}</p>
                    <p class="small">{{ item.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getuid } from "@/utils/tools.js";
import { mineApi, likeMusicApi } from "@/api/mine.js";
import { userSongCountApi, eventApi } from "@/api/userDetail.js";
export default {
  data() {
    return {
      addLength: "0",
      array: [],
      photo: "",
      chara: "",
      backgroundUrl: "",
      active: 2,
      count: "0", //我喜欢的总数量
      listensongs: "0", //累计听歌
      list: "0", //歌单
      add: "0", //收藏
      likeList: [],
      createArray: [],
      addArray: [],
      playCount: "0",
      event: [],
      reEvent: [
        {
          name: "",
          song: "",
          picUrl: "",
          album: "",
        },
      ],
    };
  },
  async created() {
    // if (getuid()) {
    const resinfo = await mineApi({ uid: getuid() });
    //console.log(resinfo);
    this.info = resinfo;
    this.photo = this.info.profile.avatarUrl;
    this.chara = this.info.profile.nickname;
    console.log(this.info);
    //  this.info.listenSongs = resinfo.listenSongs;
    this.listensongs = this.info.listenSongs;
    // console.log(this.info.listenSongs);
    this.backgroundUrl = this.info.profile.backgroundUrl;
    const likeMusicList = await likeMusicApi({ uid: getuid() });
    // console.log(likeMusicList.ids.length);
    this.count = likeMusicList.ids.length;
    const userSongCount = await userSongCountApi({ uid: getuid() });
    this.array = userSongCount.playlist;
    // console.log(this.array);
    // console.log(userSongCount);
    this.likeList = this.array.splice(0, 1);
    //console.log(this.array);
    this.array.forEach((item) => {
      if (item.userId == getuid()) {
        this.createArray.push(item);
      } else {
        this.addArray.push(item);
      }
    });
    this.list = this.createArray.length;
    this.addLength = this.addArray.length;
    let res = await eventApi({ uid: getuid() });
    console.log(res.events);
    for (let i in res.events) {
      this.reEvent[i] = JSON.parse(res.events[i].json);
      this.reEvent[i].showTime = res.events[i].showTime;
    }
    console.log(this.reEvent[0].song);
  },
  methods: {
    last() {
      this.$router.push({
        name: "Mine",
      });
    },
  },
};
</script>
<style scoped>
.music {
  display: flex;
  margin-bottom: 2vw;
  padding-left: 6vw;
}

.music div img {
  /* margin-left: 6vw; */
  margin-right: 6vw;
  width: 13vw;
  height: 13vw;
  display: inline-block;
  border-radius: 2vw;
}
.music p:first-child {
  margin: 0;
}
.small {
  font-size: 2vw;
}
.icon {
  width: 20vw;
  border-radius: 20vw;
}
.icon1 {
  width: 10vw;
  border-radius: 10vw;
}
.up {
  width: 100%;
  height: 100%;
  background-size: 100%, 100%;
}
.top_t {
  display: flex;
  justify-content: space-between;
  padding: 6vw;
  font-size: 8vw;
}
.content {
  display: flex;
  justify-content: space-between;
  padding: 6vw;
}
.bg {
  /* opacity: 0.2; */
  background: rgba(255, 255, 255, 0.2);
  color: rgb(255, 255, 255);
  border: none;
  height: 10vw;
  margin-top: 6vw;
}
.bottom {
  overflow: hidden;
  border-radius: 10vw;
  margin-top: -6vw;
}
.create {
  display: inline-block;
  padding-left: 6vw;
  display: flex;
  justify-content: space-between;
}
.create h6 {
  display: inline-block;
  padding-right: 6vw;
  display: inline-block;
}
.create p {
  display: inline-block;
  font-size: 12px;
  color: #333;
}
.move {
  display: flex;
}
.share {
  color: #333;
}
</style>
<template>
  <div class="mine">
    <van-sticky>
      <topbar
        style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000"
      ></topbar>
    </van-sticky>
    <div class="login_l">
      <div class="login" @click="picture" style="padding: 3vw 0">
        <div class="left" style="display: flex; align-item: center">
          <img :src="photo" class="icon" size="10vw" />
          <!-- <img src="../assets/mine/tubiao/denglu.png" alt="" /> -->
          <span
            style="display: inline-block; line-height: 10vw; margin-left: 4vw"
            >{{ chara }}</span
          >
        </div>
        <div class="right">
          <span style="font-size: 6vw; margin-top: -3vw; display: inline-block"
            >&gt;</span
          >
        </div>
      </div>
      <div class="list">
        <dl v-for="item in Img" :key="item.title">
          <dt>
            <img :src="item.img" style="width: 8vw; height: 8vw" alt="" />
          </dt>
          <dd>{{ item.title }}</dd>
        </dl>
      </div>

      <router-link
        :to="{
          name: 'detaillist',
          query: {
            id: likeList.id,
            coverImgUrl: likeList.coverImgUrl,
            name: likeList.name,
          },
        }"
      >
        <div class="heart">
          <div class="music" style="display: flex">
            <div>
              <img :src="likeList.coverImgUrl" alt="" style="margin: 6vw" />

              <!-- src="@/assets/mine/tubiao/woxihuan.png" -->
            </div>
            <div class="like">
              <p>{{ likeList.name }}</p>
              <p>{{ count }}首</p>
            </div>
          </div>
          <div class="move">
            <el-button
              @click="heartMove"
              size="small"
              style="margin-top: 6vw; margin-right: 5vw"
            >
              <span>♥</span>
              心动模式</el-button
            >
          </div>
        </div>
      </router-link>
      <van-tabs v-model="active" style="">
        <van-tab
          title="创建歌单"
          title-style="font-size:4vw;font-weight:800;background:#faf8f8;"
        >
          <div class="create">
            <div
              class="songs"
              style="background: white; border-radius: 3vw; padding: 0 3vw"
            >
              <div style="display: flex; justify-content: space-between">
                <p class="left">
                  <span>创建歌单</span>
                </p>
                <div class="right">
                  <span>+</span>
                  <img
                    src="@/assets/mine/tubiao/gengduo.png"
                    sty1e="width:3vw;height:3vw;display:inline-block"
                    alt=""
                  />
                </div>
              </div>

              <div v-for="item in createArray" :key="item.id">
                <router-link
                  :to="{
                    name: 'detaillist',
                    query: {
                      id: item.id,
                      coverImgUrl: item.coverImgUrl,
                      name: item.name,
                    },
                  }"
                >
                  <div class="music_m">
                    <div>
                      <img :src="item.coverImgUrl" alt="" />
                    </div>
                    <div class="like" style="color: black">
                      <p>{{ item.name }}</p>
                      <p class="small">
                        {{ item.trackCount }}首,播放{{ item.playCount }}次
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="download">
                <p><img src="@/assets/mine/tubiao/daoru1-copy.png" alt="" /></p>
                <span>导入外部歌单</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab
          title="收藏歌单"
          title-style="font-size:4vw;font-weight:800;background:#faf8f8"
        >
          <div class="collect">
            <!-- <p>暂无收藏的歌单</p> -->
            <div class="create">
              <div
                class="songs"
                style="background: white; border-radius: 3vw; padding: 0 3vw"
              >
                <div style="display: flex; justify-content: space-between">
                  <p class="left">
                    <span>收藏歌单</span>
                  </p>
                  <div class="right">
                    <img
                      src="@/assets/mine/tubiao/gengduo.png"
                      sty1e="width:3vw;height:3vw;display:inline-block"
                      alt=""
                    />
                  </div>
                </div>

                <div v-for="item in addArray" :key="item.id">
                  <router-link
                    :to="{
                      name: 'detaillist',
                      query: {
                        id: item.id,
                        coverImgUrl: item.coverImgUrl,
                        name: item.name,
                      },
                    }"
                  >
                    <div class="music_m">
                      <div>
                        <img :src="item.coverImgUrl" alt="" />
                      </div>
                      <div class="like" style="color: black">
                        <p>{{ item.name }}</p>
                        <p class="small">
                          {{ item.trackCount }}首,by{{ item.creator.nickname }}
                        </p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <!-- <div class="download">
                  <p>
                    <img src="@/assets/mine/tubiao/daoru1-copy.png" alt="" />
                  </p>
                  <span>导入外部歌单</span>
                </div>-->
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
import topbar from "@/views/Topbar";

import { userSongCountApi, eventApi } from "@/api/userDetail.js";
import { mineApi, likeMusicApi } from "@/api/mine.js";
export default {
  data() {
    return {
      array: [],
      createArray: [],
      addArray: [],
      addLength: 0,
      list: 0, //歌单
      count: 0,
      likeList: {},
      reEvent: [
        {
          name: "",
          song: "",
          picUrl: "",
          album: "",
        },
      ],
      chara: "请登录",
      info: {},
      active: 2,
      photo: require("../assets/mine/tubiao/denglu.png"),
      play: [],
      Img: [
        {
          img: require("../assets/mine/tubiao/ttpodicon.png"),
          title: "本地音乐",
        },
        { img: require("../assets/mine/tubiao/yunpan.png"), title: "云盘" },
        { img: require("@/assets/mine/tubiao/yigou.png"), title: "已购" },
        {
          img: require("@/assets/mine/tubiao/zuijinbofang.png"),
          title: "最近播放",
        },
        {
          img: require("@/assets/mine/tubiao/wodehaoyou.png"),
          title: "我的好友",
        },
        {
          img: require("@/assets/mine/tubiao/shoucang.png"),
          title: "收藏和赞",
        },
        {
          img: require("@/assets/mine/tubiao/wodediantai.png"),
          title: "我的电台",
        },
        { img: require("@/assets/mine/tubiao/more.png"), title: "更多" },
      ],
      currentDate: new Date(),
    };
  },
  async created() {
    if (getuid()) {
      const resinfo = await mineApi({ uid: getuid() });
      this.info = resinfo;
      this.photo = this.info.profile.avatarUrl;
      this.chara = this.info.profile.nickname;
      const likeMusicList = await likeMusicApi({ uid: getuid() });
      console.log(likeMusicList);
      this.count = likeMusicList.ids.length;
      this.play = this.play.concat(likeMusicList.ids); //心动模式歌曲id数组.
      console.log(this.play);

      ///////////////////获取用户歌单

      // const usrList = await playMoveList({ uid: getuid() });
      // console.log(usrList.playlist[0]);

      const userSongCount = await userSongCountApi({ uid: getuid() });
      this.array = userSongCount.playlist;
      const likeList1 = this.array;
      this.likeList = likeList1;
      console.log(this.likeList);

      // (this.likeList = likeList1[0]), console.log(this.likeList); //[0].adType
      this.array.forEach((item) => {
        if (item.userId == getuid()) {
          this.createArray.push(item);
        } else {
          this.addArray.push(item);
        }
      });
      this.list = this.createArray.length;
      this.addLength = this.addArray.length;
      console.log(this.addArray);
      console.log(this.createArray);
      /////////

      let res = await eventApi({ uid: getuid() });
      // console.log(res.events);
      for (let i in res.events) {
        this.reEvent[i] = JSON.parse(res.events[i].json);
        this.reEvent[i].showTime = res.events[i].showTime;
        // console.log(this.reEvent);
        this.reEvent[i].picUrl = this.reEvent[i].song.album.picUrl;
      }

      // console.log(this.playlist[0].id);
    }
  },
  methods: {
    picture() {
      if (getuid()) {
        this.$router.push({ name: "UserDetail" });
        const info_i = mineApi();
        console.log(info_i);
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    heartMove() {
      if (this.count.length != 0) {
        this.$router.push({
          name: "Player",
          query: { ids: this.play },
        });
      }
    },
  },
  components: {
    topbar,
  },
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.login_l {
  padding: 0 6vw;
  background: #faf8f8;
}
.login {
  height: 10vw;
  display: flex;
  justify-content: space-between;
}
.icon {
  width: 12vw;
  border-radius: 12vw;
}
.list {
  display: flex;
  flex-wrap: wrap;
  background: white;
  border-radius: 3vw;
}
.list dl {
  display: flex;
  justify-content: center;

  flex-direction: column;
  text-align: center;
  width: 22vw;
}
.list dd {
  color: #333;
}
.icon {
  display: inline-block;
}
.list dl img {
  width: 12vw;
  margin-left: 7vw;
}
.login p {
  display: inline-block;
}
.list dl dt {
  width: 12vw;
  margin: 0;
}
.list dl dd {
  text-indent: -11vw;
  font-size: 3vw;
}
.heart {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* height:20vw; */
  margin-top: 3vw;
  background: #ffffff;
  border-radius: 3vw;
}
.music img {
  width: 6vw;
  height: 6vw;
  display: inline-block;
}
.like {
  display: inline-block;
}
.like p:first-child {
  margin-top: 3vw;
  font-size: 14px;
  color: #333;
}
.like p:nth-child(2) {
  font-size: 12px;
  color: #333;
}
.move span {
  color: red;
  width: 3vw;
  height: 3vw;
}
.songs {
  /* display: flex;
  justify-content: space-between; */
}
.songs img {
  display: inline-block;
  width: 3vw;
  height: 3vw;
}
.right {
  margin-top: 4vw;
}
.download {
  /* height: 25vw; */
  background: white;
  margin-bottom: 5vw;
  border-radius: 3vw;
}
.download p {
  display: inline-block;
}
.download p img {
  width: 10vw;
  height: 10vw;
  display: inline-block;
}
.download span {
  line-height: 10vw;
}
.collect span {
  font-size: 12px;
}
.music_m {
  display: flex;
  margin-bottom: 2vw;
  /* padding-left: 6vw; */
}
.music_m div img {
  /* margin-left: 6vw; */
  margin-right: 6vw;
  width: 13vw;
  height: 13vw;
  display: inline-block;
  border-radius: 2vw;
}
.music_m p:first-child {
  margin: 0;
}
.small {
  font-size: 2vw;
}
</style>
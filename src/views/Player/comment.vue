<template>
  <div class="follow">
    <div class="top_top">
      <div class="back">
        <i class="el-icon-back" @click="back" style="font-size: 6vw"></i>
        <span style="margin-left: 3vw">评论（{{ song_total }}）</span>
      </div>
      <div class="song_card">
        <div class="song_pic">
          <img :src="pic" alt="" style="width: 20vw; border-radius: 2vw" />
        </div>
        <div class="name_p">
          <div class="song_name">
            <p>{{ song_name }}</p>
            <p style="color: #527ca7; font-size: 3.5vw">
              {{ song_singer }}
            </p>
          </div>
          <van-icon name="arrow" style="font-size: 5vw; z-index: -99" />
        </div>
      </div>
    </div>
    <div class="mid_mid">
      <div class="hot_commit">热门评论</div>
      <div class="card" v-for="i in hot_list" :key="i.commentId">
        <div class="top">
          <div class="top_l">
            <img :src="i.user.avatarUrl" alt="" />
          </div>
          <div class="top_r">
            <div class="top_r1">
              <span
                class="nikename"
                style="display: block; width: 50vw; overflow: hidden"
                >{{ i.user.nickname }}</span
              >
            </div>
            <div class="top_r2">{{ i.time | moment }}</div>
          </div>
          <div class="top_r3">
            <span style="display: block">{{ i.likedCount }}</span>
            <van-icon
              style="display: block; margin-right: 1vw"
              name="good-job"
            />
          </div>
        </div>
        <div class="mid">{{ i.content }}</div>
      </div>
      <div class="commit">评论区</div>

      <div class="card" v-for="i in list" :key="i.commentId">
        <div class="top">
          <div class="top_l">
            <img :src="i.user.avatarUrl" alt="" />
          </div>
          <div class="top_r">
            <div class="top_r1">
              <span
                class="nikename"
                style="display: block; width: 50vw; overflow: hidden"
                >{{ i.user.nickname }}</span
              >
            </div>
            <div class="top_r2">{{ i.time | moment }}</div>
          </div>
          <div class="top_r3">
            <span style="display: block">{{ i.likedCount }}</span>
            <van-icon
              style="display: block; margin-right: 1vw"
              name="good-job"
            />
          </div>
        </div>
        <div class="mid">{{ i.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcommentAPI } from "@/api/player";
// import { getuid } from "@/utils/tools";
// import { Notify } from "vant";

export default {
  //取出数据
  name: "comment",
  data() {
    return {
      hot_list: [],
      list: [],
      pic: "",
      song_name: "",
      song_singer: "",
      song_id: 0,
      song_total: 0,
    };
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
  },
  async created() {
    console.log(this.$route.query);
    this.pic = this.$route.query.pic;
    this.song_name = this.$route.query.song_name;
    this.song_singer = this.$route.query.song_singer;
    this.song_id = this.$route.query.id;
    this.song_total = this.$route.query.song_total;
    let res = await getcommentAPI({ id: this.song_id, limit: 50 });
    this.hot_list = res.hotComments;
    this.list = res.comments;
    console.log(res);
  },
};
</script>

<style scoped>
.follow {
  padding: 0 6vw;
}
.card {
  padding: 5vw 0;
  border-bottom: solid 1px #f8f3f7;
}
.top {
  display: flex;
}
.top_l img {
  width: 10vw;
  border-radius: 5vw;
}
.top_r {
  margin-left: 3vw;
}
.top_r2 {
  font-size: 3vw;
  color: #9a989b;
}
.nikename {
  color: #527ca7;
}

.mid {
  font-size: 4vw;
  line-height: 1.5;
  margin: 2vw 0;
  margin-left: 13vw;
}
.bottom {
  margin-left: 13vw;
  height: 12vw;
  display: flex;
  background-color: #f8f3f7;
  border-radius: 2vw;
}
.bottom_l {
  display: flex;
  align-items: center;
}
.bottom_l img {
  width: 8.5vw;
  height: 8.5vw;
  border-radius: 1vw;
  margin-left: 1.75vw;
}
.bottom_r {
  width: 100%;
  padding: 1.75vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bottom_r1 {
  font-size: 3.5vw;
  line-height: 1;
}
.bottom_r2 {
  font-size: 2.5vw;
  color: #9a989b;
  line-height: 1;
}
.top_r3 {
  width: 37vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.top_r3 span {
  color: #98999a;
  font-size: 3vw;
  margin-right: 2vw;
}
.top_r3 i {
  color: #98999a;
  font-size: 3vw;
}
/* //////////// */
.top_top {
  padding: 0 6vw;
  width: 100%;
  background-color: rgb(63, 46, 46);
  height: 20vh;
  padding-bottom: 1.5vh;
  border-bottom: solid 1px #d9d9dd;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 99;
}
.back {
  display: flex;
  height: 8vh;
  align-items: center;
}
.back i {
  display: block;
}
.back span {
  display: block;
}
.song_card {
  /* width: 12vh; */
  display: flex;
}
.name_p {
  margin-left: 4vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* flex-grow: 1; */
}
.song_card p {
  display: flex;
  width: 57vw;
}
.song_name {
  /* display: flex; */
  /* flex-direction: column; */
  justify-content: center;
}
.mid_mid {
  margin-top: 22vh;
}
</style>
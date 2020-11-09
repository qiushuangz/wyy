<template>
  <div class="follow">
    <div class="card" v-for="i in list_a" :key="i.showTime">
      <div class="top">
        <div class="top_l">
          <img :src="i.avatarUrl" alt="" />
        </div>
        <div class="top_r">
          <div class="top_r1">
            <span class="nikename">{{ i.nickname }}</span
            ><span> 分享单曲：</span>
          </div>
          <div class="top_r2">{{ i.showTime | moment }}</div>
        </div>
      </div>
      <div class="mid">{{ i.msg }}</div>
      <div class="bottom">
        <div class="bottom_l">
          <img :src="i.song.album.blurPicUrl" alt="" />
        </div>
        <div class="bottom_r">
          <div class="bottom_r1">{{ i.song.name }}</div>
          <div class="bottom_r2">{{ i.song.artists[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gettrendsAPI } from "@/api/yuncun";
import { getuid } from "@/utils/tools";
import { Notify } from "vant";

export default {
  //取出数据
  name: "follow",
  data() {
    return {
      list_all: [],
      list_a: [],
    };
  },
  async created() {
    if (getuid()) {
      let res = await gettrendsAPI({ uid: getuid() });
      console.log(res);
      for (let i in res.event) {
        this.list_all.push(JSON.parse(res.event[i].json));
        this.list_all[i].nickname = res.event[i].user.nickname;
        this.list_all[i].userId = res.event[i].user.userId;
        this.list_all[i].avatarUrl = res.event[i].user.avatarUrl;
        this.list_all[i].showTime = res.event[i].showTime;
        this.list_all[i].type = res.event[i].type;
        // if (res.event[i].type == 18) {
        //   this.list_all[i].type = "分享单曲";
        // } else if (res.event[i].type == 41 || res.event[i].type == 42) {
        //   this.list_all[i].type = "分享视频";
        // } else if (res.event[i].type == 39) {
        //   this.list_all[i].type = "发布视频";
        // } else {
        //   // this.list_all[i].type = "发布";
        //   this.list_all.splice(i, 1);
        // }
        // console.log(this.list_all[i].type);
      }
      console.log(this.list_all);
      for (let j in this.list_all) {
        if (this.list_all[j].type == 18) {
          this.list_all[j].type = "分享单曲";
          this.list_a.push(this.list_all[j]);
        }
        //  else if (this.list_all[j] == 41 || res.event[j].type == 42) {
        //   this.list_all[j].type = "分享视频";
        //   this.list_a.push(this.list_all[j]);
        // } else if (this.list_all[j] == 39) {
        //   this.list_all[j].type = "发布视频";
        //   this.list_a.push(this.list_all[j]);
        // }
      }
      console.log(this.list_a);
    } else {
      Notify("请登录");
      this.$router.push({ name: "Login" });
    }
  },
};
// 获取动态消息
// 说明 : 调用此接口 , 可获取各种动态 , 对应网页版网易云，朋友界面里的各种动态消息 ，如分享的视频，音乐，照片等！

// 必选参数 : pagesize : 每页数据,默认20

// lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据

// 接口地址 : /event

// 调用例子 : /event?pagesize=50&lasttime=1556740526369
// 18 分享单曲
// 19 分享专辑
// 17、28 分享电台节目
// 22 转发
// 39 发布视频
// 35、13 分享歌单
// 24 分享专栏文章
// 41、21 分享视频
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
  margin-left: 13vw;
  line-height: 1.5;
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
</style>
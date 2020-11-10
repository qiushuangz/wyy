<template>
  <div class="video">
    <topbar></topbar>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推荐" name="first">
        <dl v-for="(item, index) in videoPlay" :key="index" style="width: 90vw">
          <video
            :src="item.url"
            controls="controls"
            class="image"
            style="height: 40vw; display: block; margin: auto"
          ></video>
          <p style="font-size: 3vw; margin-left: 8vw">{{ item.data.title }}</p>
          <div style="display: flex" class="picCount">
            <div style="display: flex; align-item: center">
              <img
                :src="item.bgUrl"
                style="width: 8vw; border-radius: 8vw; margin-right: 2vw"
              />
              <span style="font-size: 3vw; display: block; margin-top: 2vw">{{
                item.data.creator.nickname
              }}</span>
            </div>
            <div style="margin-top: 3vw">
              <van-icon name="good-job-o" style="margin-right: 2vw" />
              <van-icon name="chat-o" badge="9" style="margin-right: 2vw" />
              <img
                src="@/assets/mine/tubiao/gengduo.png"
                style="
                  width: 3vw;
                  height: 3vw;
                  display: inline-block;
                  margin-right: 2vw;
                  margin-top: -1vw;
                "
                alt=""
              />
            </div>
          </div>
        </dl>
      </el-tab-pane>
      <el-tab-pane label="LOOK直播" class="change" name="second"
        >配置管理</el-tab-pane
      >
      <el-tab-pane label="看见音乐" class="change" name="third"
        >角色管理</el-tab-pane
      >
      <el-tab-pane label="现场" class="change" name="fourth"
        >定时任务补偿</el-tab-pane
      >
      <el-tab-pane label="翻唱" class="change" name="fifth"
        >角色管理</el-tab-pane
      >
      <el-tab-pane label="歌曲" class="change" name="sixth"
        >定时任务补偿</el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import { videoApi, playApi } from "@/api/video.js";
import topbar from "@/views/Topbar";
export default {
  data() {
    return {
      activeName: "second",
      videoPlay: [],
      bgUrl: [],
    };
  },
  async created() {
    const res = await videoApi();
    this.videoPlay = res.datas;
    // console.log(res.datas);

    for (let i in res.datas) {
      let uu = await playApi({ id: this.videoPlay[i].data.vid });
      //   console.log(uu.urls[0].url);
      this.videoPlay[i].url = uu.urls[0].url;
      this.videoPlay[i].bgUrl = this.videoPlay[i].data.creator.avatarUrl;
    }
    console.log(this.videoPlay[0].bgUrl);
    console.log(this.videoPlay[0].data.creator.avatarUrl);
    console.log(this.videoPlay);
    // console.log(data.creator.experts[1]);
    // playApi()     creator.avatarUrl
    // datas[0].data.vid
    //  this.video = res.data;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    topbar,
  },
};
</script>
<style scoped>
.video-v {
  padding: 0 6vw;
}
.picCount {
  display: flex;
  justify-content: space-around;
}
/* .change:hover {
  color: red;
} */

/* .pic {
  height: 100%;
  display: flex;
  align-items: center;
}
.pic span {
  display: block;
} */
</style>
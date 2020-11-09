<template>
  <div class="video">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推荐" name="first">
        <div class="video_v">
          <audio></audio>
          <p></p>
          <div class="chara">
            <p></p>
            <p>
              <span></span>
              <span></span>
              <span
                ><img src="../assets/mine/tubiao/gengduo.png" alt=""
              /></span>
            </p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="LOOK直播" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="看见音乐" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="现场" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="翻唱" name="fifth">角色管理</el-tab-pane>
      <el-tab-pane label="歌曲" name="sixth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <topbar></topbar>
  </div>
</template>

<script>
import topbar from "@/views/Topbar";
export default {
  data() {
    return {
      activeName: "second",
    };
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
.video {
  padding: 0 6vw;
}
</style>
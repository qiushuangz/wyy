<template>
  <div>
    <el-page-header
      @back="goBack"
      style="height: 60px; line-height: 60px; margin-left: 10px"
    >
    </el-page-header>
    <div style="margin: 10px; font-weight: 800">不可错过的欧美金曲</div>
    <!-- 跳转至播放歌曲页面 -->
    <router-link
      :to="{ name: 'Player', query: { id: item.artistId } }"
      :key="item.artistId"
      v-for="item in unmissable"
    >
      <van-card :desc="item.briefDesc" :title="item.name" :thumb="item.cover"
    /></router-link>
  </div>
</template>

<script>
import { unmissableAPI } from "@/api/find";
export default {
  data() {
    return {
      unmissable: [],
    };
  },
  async created() {
    const unmissable = await unmissableAPI();
    this.unmissable = unmissable.data;
    console.log(this.unmissable);
  },
  methods: {
    goBack() {
      console.log("go back");
      this.$router.push({ path: "/find" });
    },
  },
};
</script>

<style scoped>
.el-page-header__title {
  height: 30px;
}
</style>
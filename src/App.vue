<template>
  <div id="app">
    <!-- route 表示底部导航可以实现跳转功能 -->
    <van-tabbar :fixed="false" route v-model="active" active-color="deeppink">
      <van-icon
        name="wap-nav"
        size="1.3rem"
        class="icon_top"
        @click="to_sidebar()"
      />
      <van-tabbar-item :to="{ name: 'Mine' }">我的</van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Find' }">发现</van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Yuncun' }">云村</van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Video' }">视频</van-tabbar-item>
      <van-icon
        name="search"
        size="1.3rem"
        class="icon_top"
        @click="to_search()"
      />
    </van-tabbar>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    to_sidebar() {
      this.$router.push({
        name: "Sidebar",
      });
    },
    to_search() {
      this.$router.push({
        name: "Search",
      });
    },
  },
};
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
.icon_top {
  margin: 1rem 0.5rem 0 0.5rem;
}
</style>

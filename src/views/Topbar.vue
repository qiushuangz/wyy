<template>
  <div class="Topbar">
    <van-tabbar :fixed="false" route v-model="active" active-color="#EC4141">
      <van-icon
        name="wap-nav"
        size="1.3rem"
        class="icon_top"
        @click="to_sidebar()"
      />
      <van-tabbar-item :to="{ name: 'Mine' }" class="van-tabbar-item"
        ><span>我的</span></van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Find' }"
        ><span>发现</span></van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Yuncun' }"
        ><span>云村</span></van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Video' }"
        ><span>视频</span></van-tabbar-item
      >
      <van-icon
        name="search"
        size="1.3rem"
        class="icon_top"
        @click="to_search()"
      />
    </van-tabbar>
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

<style scoped>
.icon_top:hover {
  color: #ec4141;
  font-weight: 800;
  font-size: 1.2rem;
}
</style>
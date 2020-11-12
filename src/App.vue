<template>
  <div id="app">
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      name="viewport"
    />
    <!-- route 表示底部导航可以实现跳转功能 -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
<style>
.icon_top {
  margin: 1rem 0.5rem 0 0.5rem;
}
.van-tabbar-item span {
  font-size: 4vw;
  font-weight: 900;
}
</style>

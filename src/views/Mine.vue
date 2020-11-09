<template>
  <div class="mine">
    <div class="login">
      <van-icon
        class="icon"
        color="pink"
        size="10vw"
        name="https://b.yzcdn.cn/vant/icon-demo-1126.png"
      />
      <span>立即登录 &gt;</span>
    </div>
    <div class="list">
      <dl v-for="item in Img" :key="item.title">
        <dt>
          <img :src="item.img" style="width:8vw;height:8vw" alt="" />
        </dt>
        <dd>{{ item.title }}</dd>
      </dl>
    </div>
    <div class="heart">
      <div class="music">
        <img src="@/assets/mine/tubiao/woxihuan.png" alt="" />
        <div class="like">
          <p>我喜欢的音乐</p>
          <p>0首</p>
        </div>
      </div>
      <div class="move">
        <el-button style="margin-top: 5vw">
          <span>♥</span>
          心动模式</el-button
        >
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab  title="创建歌单" title-style="font-size:4vw;font-weight:800">
        <div class="create">
          <div class="songs">
            <p class="left">
              <span>创建歌单</span>
            </p>
            <div class="right">
              <span>+</span>.
              <img
                src="@/assets/mine/tubiao/gengduo.png"
                sty1e="width:3vw;height:3vw;display:inline-block"
                alt=""
              />
            </div>
          </div>
          <div class="download">
            <p><img src="@/assets/mine/tubiao/daoru1-copy.png" alt="" /></p>
            <span>导入外部歌单</span>
          </div>
        </div>
        <div class="create">
          <div class="songs">
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
         
        </div>
      </van-tab>
      <van-tab title="收藏歌单"  title-style="font-size:4vw;font-weight:800">
      <div class="collect">
            <p>暂无收藏的歌单</p>
          </div>

      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2,
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
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}
.mine {
  padding: 6vw;
}
.login {
  height: 10vw;
}
.list {
  display: flex;
  flex-wrap: wrap;
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
  margin-left: 3vw;
}
.login p {
  display: inline-block;
}
.list dl dt {
  width: 12vw;
  margin: 0;
}
.list dl dd {
  text-indent: -16vw;
}
.heart {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* height:20vw; */
  margin-top: 3vw;
  background: #ffffff;
}
.music img {
  width: 8vw;
  height: 8vw;
  display: inline-block;
}
.like {
  display: inline-block;
}
.like p:first-child {
  margin-top: 3vw;
  font-size: 14px;
}
.like p:nth-child(2) {
  font-size: 12px;
}
.move span {
  color: red;
  width: 3vw;
  height: 3vw;
}
.songs {
  display: flex;
  justify-content: space-between;
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
  height: 25vw;
  background:skyblue;
  margin-bottom:5vw;
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
.collect span{
   font-size:12px;
}
</style>
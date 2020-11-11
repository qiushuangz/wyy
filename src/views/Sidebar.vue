<template>
  <div class="sidebar">
    <!-- top的买会员的 -->
    <a href="/" class="top">
      <img :src="img.topImg" alt="" to="{ name: 'Find' }"
    /></a>
    <!-- 云贝中心和消息中心 -->
    <el-row style="display: flex">
      <el-col :span="11" class="left"
        ><div class="grid-content bg-purple">
          <van-card desc="签到>" title="云贝中心" :thumb="img.yunbei" /></div
      ></el-col>
      <div style="height: 23vw; width: 1px; background: #000"></div>
      <el-col :span="12" class="right"
        ><div class="grid-content bg-purple-light">
          <van-card
            desc="有关注新歌发布"
            title="消息发布"
            :thumb="img.messageImg"
          /></div
      ></el-col>
    </el-row>
    <div class="item1">
      <div class="item1_left">
        <img class="item1_left_img" :src="img.chuangzuozheImg" alt="" />
      </div>
      <div class="item1_center" style="font-weight: 800">创作者中心</div>
      <div class="item1_right">&gt;</div>
    </div>
    <div class="yinyueSer" style="overflow: hidden">
      <div class="serve">音乐服务</div>
      <van-divider />
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.tinggeshiquImg" alt="" />
        </div>
        <div class="item1_center">听歌识曲</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.yuncunyoupiaoImg" alt="" />
        </div>
        <div class="item1_center">云村有票</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.shangchengImg" alt="" />
        </div>
        <div class="item1_center">商城</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.youxizhuanquImg" alt="" />
        </div>
        <div class="item1_center">游戏专区</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.koudaicailingImg" alt="" />
        </div>
        <div class="item1_center">口袋彩铃</div>
      </div>
    </div>
    <div class="yinyueSer" style="overflow: hidden">
      <div class="serve">其他</div>
      <van-divider />
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.gexingzhuangbanImg" alt="" />
        </div>
        <div class="item1_center">个性装扮</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.gexingzhuangbanImg" alt="" />
        </div>
        <div class="item1_center">个性装扮</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.dingshiguanbiImg" alt="" />
        </div>
        <div class="item1_center">定时关闭</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.saoyisaoImg" alt="" />
        </div>
        <div class="item1_center">扫一扫</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.biantingbiancunImg" alt="" />
        </div>
        <div class="item1_center">边听边存</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.zaixianImg" alt="" />
        </div>
        <div class="item1_center">在线听歌免流量</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.heimingdanImg" alt="" />
        </div>
        <div class="item1_center">音乐黑名单</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.qingshaonianImg" alt="" />
        </div>
        <div class="item1_center">青少年模式</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.yinyuenaozhongImg" alt="" />
        </div>
        <div class="item1_center">音乐闹钟</div>
      </div>
    </div>
    <div class="yinyueSer" style="overflow: hidden; margin-top: 20px">
      <!-- <div class="serve">音乐服务</div>
      <van-divider /> -->
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.wodedingdanImg" alt="" />
        </div>
        <div class="item1_center">我的订单</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.youhuiquanImg" alt="" />
        </div>
        <div class="item1_center">优惠券</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.bangzhuImg" alt="" />
        </div>
        <div class="item1_center">帮助与反馈</div>
      </div>
      <div class="item1">
        <div class="item1_left">
          <img class="item1_left_img" :src="img.guanyuImg" alt="" />
        </div>
        <div class="item1_center">关于</div>
      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="circle">夜间模式</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
      <van-tabbar-item icon="circle">退出</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: {
        topImg: require("../assets/sidebar/sidebar.png"),
        yunbei: require("../assets/sidebar/yunBei.png"),
        messageImg: require("../assets/sidebar/message.png"),
        chuangzuozheImg: require("../assets/sidebar/chuangzuozhe.png"),

        tinggeshiquImg: require("../assets/sidebar/tinggeshiqu.png"),
        yuncunyoupiaoImg: require("../assets/sidebar/yuncunyoupiao.png"),
        shangchengImg: require("../assets/sidebar/shangcheng.png"),
        youxizhuanquImg: require("../assets/sidebar/youxizhuanqu.png"),
        koudaicailingImg: require("../assets/sidebar/koudaicailing.png"),
        gexingzhuangbanImg: require("../assets/sidebar/gexingzhuangban.png"),
        dingshiguanbiImg: require("../assets/sidebar/dingshiguanbi.png"),
        saoyisaoImg: require("../assets/sidebar/saoyisao.png"),
        biantingbiancunImg: require("../assets/sidebar/biantingbiancun.png"),
        zaixianImg: require("../assets/sidebar/zaixian.png"),
        heimingdanImg: require("../assets/sidebar/heimingdan.png"),
        qingshaonianImg: require("../assets/sidebar/qingshaonian.png"),
        yinyuenaozhongImg: require("../assets/sidebar/yinyuenaozhong.png"),
        wodedingdanImg: require("../assets/sidebar/wodedingdan.png"),
        youhuiquanImg: require("../assets/sidebar/youhuiquan.png"),
        bangzhuImg: require("../assets/sidebar/bangzhu.png"),
        guanyuImg: require("../assets/sidebar/guanyu.png"),
        yejianmoshiImg: require("../assets/sidebar/yejianmoshi.png"),
        shezhiImg: require("../assets/sidebar/shezhi.png"),
        tuichuImg: require("../assets/sidebar/tuichu.png"),
      },
    };
  },
};
</script>

<style scoped>
html,
body {
  height: 1000px;
}
.sidebar {
  background: #f7f7f7;
  /* background: red; */
}
.top {
  width: 90vw;
  display: block;

  margin: 0 auto;
}
.top img {
  width: 100%;
}

.van-card__thumb {
  width: 50px;
  height: 50px;
}
.van-card__title {
  font-size: 20px;
  padding: 6px 0 10px 0;
  font-weight: 800;
}
.left .van-card__desc {
  border: 3px solid #fb3d3c;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  color: #fb3d3c;
  margin-top: 10px;
}
.right .van-card__desc {
  font-size: 14px;
  color: #9c9c9c;
  margin: 10px 0 0 -10px;
}
.item1 {
  width: 90%;
  height: 60px;
  background: #fff;
  border-radius: 5px;
  margin: 10px auto;
  display: flex;
}
.item1_left_img {
  width: 40px;
  height: 40px;
  margin: 10px;
}
.item1_center {
  line-height: 60px;

  margin: 0 15px;
}
.item1_right {
  line-height: 60px;
  margin-left: 42%;
}
.yinyueSer {
  background: #fff;
}
.serve {
  margin: 5px 0 0 30px;
  color: #888;
}
</style>
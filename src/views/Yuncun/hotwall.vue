<template>
  <div class="hotwall">
    <van-loading
      type="spinner"
      size="10vw"
      color="#EC4141"
      v-if="show == true"
    />
    <div class="van_show" v-else>
      <div class="van1">
        <img class="img_tou" :src="hotwall.simpleUserInfo.avatar" alt="" /><span
          style="margin-left: 5vw"
          >{{ hotwall.simpleUserInfo.nickname }}</span
        >
      </div>
      <p class="text_maohao">“</p>
      <p>
        {{ hotwall.content }}
      </p>
      <div>
        <span>{{ hotwall.simpleResourceInfo.song.name }}</span
        >-<span>{{ hotwall.simpleResourceInfo.artists[0].name }}</span>
      </div>
      <div class="next">
        <i class="el-icon-arrow-left" @click="page_cut"></i>
        <span>{{ page + 1 }}/{{ length + 1 }}</span>
        <i class="el-icon-arrow-right" @click="page_add"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { gethotwallAPI } from "@/api/yuncun";
export default {
  data() {
    return {
      show: true,
      page: 0,
      length: 0,
      hotwall_all: {},
      hotwall: {
        simpleUserInfo: {
          avatar: {}, //用户头像
          nickname: {}, //用户昵称
        },
        simpleResourceInfo: {
          song: {}, //歌曲名字
          artists: {
            //演唱
            0: [],
          },
        },
      },
    };
  },
  //取出数据
  async created() {
    let res = await gethotwallAPI();
    this.hotwall_all = res.data;
    this.hotwall = res.data[this.page];
    this.length = res.data.length;
    this.show = false;
    console.log(this.hotwall_all);
  },
  methods: {
    page_cut() {
      this.page--;
      if (this.page <= 0) {
        this.page = 0;
      }
      this.hotwall = this.hotwall_all[this.page];
    },
    page_add() {
      this.page++;
      if (this.page >= this.length) {
        this.page = this.length;
      }
      this.hotwall = this.hotwall_all[this.page];
    },
  },
};
</script>

<style scoped>
.hotwall {
  padding: 0 6vw;
}
.img_tou {
  width: 8vw;
  border-radius: 4vw;
}
.text_maohao {
  font-size: 30vw;
  margin: 0;
  height: 14vw;
}
.next {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.next i {
  font-size: 10vw;
}
.next i:hover {
  color: aquamarine;
}
.van_show {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: space-around;
}
/* .bgc img {
  width: 50%;
  filter: blur(10px);
  z-index: -1;
  position: relative;
} */
.van1 {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
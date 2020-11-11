<template>
  <div class="search">
    <div class="content">
      <div class="search_s">
        <span>
          <van-icon
            name="arrow-left"
            @click="last"
            style="width: 6vw; height: 6vw"
          />
          <!-- <img
            @click="last"
            src="../assets/mine/tubiao/zuojiantou.png"
            alt=""
            style="width: 6vw; height: 6vw
            position:absolute;
            top:5vw;
            left:2vw;
            
            "
        />-->
        </span>
        <input
          type="text"
          v-model="txt"
          style="
            display: inline-blobk;
            width: 80%;
            height: 10vw;
            border: none;
            outline: none;
            border-bottom: solid 1px black;
            position: relative;
          "
        />
        <van-icon
          name="cross"
          @click="cleanHandle"
          style="width: 6vw; height: 6vw"
        />
        <!-- <span class="el-icon-close" "></span> -->
        <ul style="position: absolute; height: 125vw; overflow: hidden">
          <li
            v-for="item in songs"
            :key="item.id"
            style="
              height: 8vw;
              line-height: 8vw;
              border-bottom: solid 1px #333;
              padding: 3vw;
              background: white;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            <van-icon name="search" style="padding: 0 2vw" />
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="history" style="">
        <div class="history_h">
          <span>历史</span> <span>历史歌曲</span
          ><span style="margin-left: 55vw"
            ><img
              src="../assets/search/garbage.png"
              style="width: 6vw; height: 6vw"
              alt=""
          /></span>
        </div>
      </div>
      <div class="hot">
        <p>热搜榜</p>
        <p>
          <img
            src="../assets/search/play.png"
            style="width: 2vw; height: 2vw"
            alt="111"
          />
          播放全部
        </p>
      </div>
      <div class="count">
        <div class="songs" style="display: inline-block">
          <span
            v-for="(item, index) in hotDetail"
            :key="item.id"
            style="
              width: 40vw;
              display: inline-block;
              line-height: 8vw;
              margin-left: 4vw;
            "
            >{{ index + 1 }}{{ item.searchWord }}</span
          >
        </div>
      </div>
      <el-button
        type="primary"
        :loading="isLoad"
        @click="clickHandle"
        v-show="isShow"
        >加载更多</el-button
      >
    </div>
    <div class="under">
      <el-row :gutter="20">
        <el-col :span="12"
          ><div
            style="height: 15vw; margin-top: 5vw"
            class="grid-content bg-purple"
          ></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { searchApi, hotDetailApi } from "@/api/search.js";
export default {
  data() {
    return {
      isLoad: false,
      txt: "",
      word: "",
      songs: "",
      isShow: true,
      hotDetail: [],
      hotDetailAll: [],
      newHotDetail: [],
    };
  },
  watch: {
    async txt(v) {
      console.log(v);
      this.word = v;
      if (this.word.length != 0) {
        const res = await searchApi({ keywords: this.word });
        this.songs = res.result.songs;
        //console.log(res.result);
      } else {
        this.songs = "";
      }
    },
  },
  async created() {
    let res = await hotDetailApi();
    // console.log(res.data)
    this.hotDetail = res.data.splice(0, 10);
    console.log(this.hotDetail);
    this.hotDetailAll = res.data.splice(0, 10);
    console.log(this.hotDetailAll);

    //  console.log(hot);
  },
  methods: {
    clickHandle() {
      this.isLoad = true;
      console.log(this.hotDetail);
      console.log(this.hotDetailAll);

      this.hotDetail = this.hotDetail.concat(this.hotDetailAll);
      console.log(this.newHotDetail);
      this.isLoad = false;
      this.isShow = false;
    },
    last() {
      this.$router.push({
        name: "Mine",
      });
    },
    cleanHandle() {
      this.txt = "";
      this.songs = "";
      console.log(1);
    },
  },
};
</script>
<style scoped>
.search {
  padding: 0 6vw;
}
/* .history {
  /* display: flex;
  justify-content: space-between; */
/* } */
.hot {
  display: flex;
  justify-content: space-between;
}

/* .count {
  flex-direction: column;
} */
/* .el-row {
  margin-bottom: 20px;
  /* :last-child {
      margin-bottom: 0;
    } */
/* } */
/* .el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
/* } */
</style>
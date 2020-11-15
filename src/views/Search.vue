<template>
  <div class="search">
    <div class="content">
      <div class="search_s">
        <span>
          <van-icon
            name="arrow-left"
            size="35"
            @click="last"
            style="
              width: 6vw;
              height: 6vw;
              top: 3vw;
              margin-right: 2vw;
              margin-left: -2vw;
            "
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
          placeholder="华晨宇最近很火哦"
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
          style="top: 3vw"
          size="30"
          @click="cleanHandle"
        />
        <!-- <span class="el-icon-close" "></span> -->
        <ul style="position: absolute; height: 125vw; overflow: auto">
          <li
            v-for="item in songs"
            :key="item.id"
            @click="searchEvent({ name: item.name, id: item.id })"
            style="
              height: 8vw;
              line-height: 8vw;
              border-bottom: solid 1px #333;
              border-color: #cecece;
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
      <!-- <div class="history" style="">
        <div class="history_h">
          <span>历史</span> <span>历史歌曲</span
          ><span style="margin-left: 55vw"
            ><img
              src="../assets/search/garbage.png"
              style="width: 6vw; height: 6vw"
              alt=""
          /></span>
        </div>
      </div> -->
      <div class="hot">
        <p style="font-weight: 800">热搜榜</p>
        <p
          style="
            border: solid 1px #cecece;
            margin-right: 8vw;
            border-radius: 3vw;
          "
        >
          <img
            src="../assets/search/play.png"
            style="width: 2vw; height: 2vw"
            alt="111"
          />
          <span style="font-size: 3.5vw"> 播放全部</span>
        </p>
      </div>
      <div class="count">
        <div class="songs" style="display: inline-block">
          <p
            @click="inputEvent(item)"
            v-for="(item, index) in hotDetail"
            :key="item.id"
            style="
              margin: 0;
              padding: 0;
              width: 80vw;
              margin-left: 4vw;
              display: inline-block;
              line-height: 10vw;
              overflow: hidden;
              font-size: 4vw;
              color: (96, 96, 96);
            "
          >
            <i style="margin-right: 7vw;font-size:4.5vw; color: #f05048">{{ index + 1 }}</i
            >{{ item.searchWord
            }}<i
              style="
                font-weight: 800;
                margin-left: 4vw;
                font-size: 4vw;
                color: #f73f3e;
              "
              >hot</i
            >
          </p>
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
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { searchApi, hotDetailApi } from "@/api/search.js";
import { copy } from "@/api/detailList.js";
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
      songsArray:[],
    };
  },
  watch: {
    async txt(v) {
      console.log(v);
      this.word = v;
      if (this.word.length != 0) {
        const res = await searchApi({ keywords: this.word, type: 1 });
        this.songs = res.result.songs;
        console.log(res.result);
      } else {
        this.songs = "";
      }
    },
  },
  async created() {
    let res = await hotDetailApi();
    console.log(res);
    this.hotDetail = res.data.splice(0, 10);
    // console.log(this.hotDetail);
    this.hotDetailAll = res.data.splice(0, 10);
    //console.log(this.hotDetailAll);

    //  console.log(hot);
  },
  methods: {
    clickHandle() {
      this.isLoad = true;
      // console.log(this.hotDetail);
      // console.log(this.hotDetailAll);

      this.hotDetail = this.hotDetail.concat(this.hotDetailAll);
      console.log(this.hotDetail);
      for(let i in  this.hotDetail){
      this.songsArray.push({id:this.hotDetail[i].id});
      console.log(this.hotDetail[i].id);
      }
     
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
    },
    async searchEvent(v) {
      //点击li把值放到input框。
      this.txt = v.name;
      const res = await copy({ id: v.id });
      console.log(res.message);
      if (res.success == true) {
        this.$router.push({
          name: "Player",
          query: {
            id: v.id,
          },
        });
      } else {
        Toast({
          message: "亲爱的，暂无版权",
          icon: "like-o",
        });
      }

      console.log(res);
    },

    async inputEvent(v) {
      this.txt = v.searchWord;
    },
  },
};
</script>
<style scoped>
.search {
  padding: 0 6vw;
  height: 100%;
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
/* .element:hover{
  background:pink;
} */
</style>
<template>
  <div class="search">
    <div class="content">
      <div class="search_s">
        <span>
          <img
            src="../assets/mine/tubiao/zuojiantou.png"
            alt=""
            style="width: 6vw; height: 6vw"
        /></span>
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
          "
        />
      </div>
      <div class="history">
        <div class="history_h">
          <span>历史</span>
          <span>历史歌曲</span>
        </div>
        <span
          ><img
            src="../assets/search/garbage.png"
            style="width: 6vw; height: 6vw"
            alt=""
        /></span>
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
        <div class="songs">
          <li></li>
        </div>
        <el-button type="primary" :loading="isLoad" @click="clickHandle"
          >加载中</el-button
        >
      </div>
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
import { searchApi } from "@/api/search.js";
export default {
  data() {
    return {
      isLoad: false,
      txt: "",
      word:'',
    };
  },
  // async created(){
    watch:{
    txt(v){
      console.log(v);
      this.word = v;
      if (this.word.length != 0) {
        const res =searchApi({ 'keywords': this.word })
        console.log(res.result)
        //console.log(res.result);
      }
    }
  // } 
  },
  methods: {
    clickHandle() {
      this.isLoad = true;
    },
  },
};
</script>
<style scoped>
.search {
  padding: 0 6vw;
}
.history {
  display: flex;
  justify-content: space-between;
}
.hot {
  display: flex;
  justify-content: space-between;
}
.count {
  flex-direction: column;
}
.el-row {
  margin-bottom: 20px;
  /* :last-child {
      margin-bottom: 0;
    } */
}
.el-col {
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
}
</style>
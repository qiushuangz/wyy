import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

//避免重复提交路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    // 默认跳转到 '我的'
    path: "/",
    redirect: "/mine",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("../views/Reg.vue"),
  },
  {
    path: "/sidebar",
    name: "Sidebar",
    component: () => import("../views/Sidebar.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("../views/Mine.vue"),
  },
  {
    path: "/find",
    name: "Find",
    component: () => import("../views/Find.vue"),
  },
  {
    path: "/yuncun",
    name: "Yuncun",
    component: () => import("../views/Yuncun.vue"),
  },
  {
    path: "/video",
    name: "Video",
    component: () => import("../views/Video.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/userDetail",
    name: "UserDetail",
    component: () => import("../views/userDetail.vue"),
  },
  {
    path: "/player",
    name: "Player",
    component: () => import("../views/Player.vue"),
  },
  {
<<<<<<< HEAD
    path: "/detaillist",
    name: "detaillist",
    component: () => import("../views/detailList.vue"),
=======
    path: "/comment",
    name: "comment",
    component: () => import("../views/Player/comment.vue"),
>>>>>>> b94e472023a5338cb80738ee3fa3847c170a3f75
  },
];

const router = new VueRouter({
  routes,
});

export default router;

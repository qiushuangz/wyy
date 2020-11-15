import { get } from "@/utils/request";
//登录接口
export function mineApi(params) {
  return get("/user/detail", params);
}


//


export function likeMusicApi(params) {
  return get("/likelist", params);
}

//获取用户歌单
export function playMoveList(params) {
  return get("/user/playlist", params);
}

// export function likeMusicApi(params) {
//   return get("/playmode/intelligence/list", params);
// }

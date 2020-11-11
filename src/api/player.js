import { get } from "@/utils/request";

//获取--音乐详情
export function getsongAPI(params) {
  return get("/song/detail", params);
}
//获取--音乐播放链接
export function geturlAPI(params) {
  return get("/song/url", params);
}
//获取--音乐评论
export function getcommentAPI(params) {
  return get("/comment/music", params);
}
//获取--我喜欢的音乐
export function likemusicAPI(params) {
  return get("/likelist", params);
}

//获取--喜欢or取消喜欢音
export function addlikeAPI(params) {
  return get("/like", params);
}

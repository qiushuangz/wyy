import { get } from "@/utils/request";

//获取--音乐详情
export function getsongAPI(params) {
  return get("/song/detail", params);
}
//获取--音乐播放链接
export function geturlAPI(params) {
  return get("/song/url", params);
}

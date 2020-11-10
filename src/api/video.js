import { get } from "@/utils/request";
export function videoApi() {
  return get("/video/timeline/recommend");
}


//播放接口
export function playApi(params) {
  return get("/video/url", params);
}
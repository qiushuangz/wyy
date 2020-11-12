import { get } from "@/utils/request";
// 获取find的数据
//banner
export function bannerAPI() {
  return get('/banner')
}
// 音乐日历
export function unmissableAPI() {
  return get('/mv/first?limit=100')
  // return get('/top/artists')
}

export function busyAPI() {
  return get('/mv/all')
}

export function findAPI() {

  return get(
    "/homepage/block/page"
  );
}
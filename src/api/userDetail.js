import { get } from "@/utils/request";
//登录接口
export function userSongCountApi(params) {//用户听歌总数量api
  return get('/user/playlist', params)
}
export function eventApi(params) {//用户听歌总数量api
  return get('/user/event', params)
}
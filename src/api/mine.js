import { get } from "@/utils/request";
//登录接口
export function mineApi(params) {
  return get('/user/detail', params)
}

export function likeMusicApi(params) {
  return get('/likelist', params)
}
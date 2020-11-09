import { get } from "@/utils/request";

export function loginAPI() {
  return get(
    "/login/cellphone?phone=18603789747&password=954932" +
      "&timestamp=" +
      new Date().getTime()
  );
}
//获取用户登录状态
export function statusAPI() {
  return get("/login/status" + "?timestamp=" + new Date().getTime());
}
//登陆我的账号
export function loginoutAPI() {
  return get("/logout" + "?timestamp=" + new Date().getTime());
}
//获取--用户关注动态
export function gettrendsAPI(params) {
  return get("/user/event", params);
}

//获取--热评墙
export function gethotwallAPI(params) {
  return get("/comment/hotwall/list", params);
}

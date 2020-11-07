import { get } from "@/utils/request";

export function loginAPI() {
  return get(
    "/login/cellphone?phone=18603789747&password=954932" +
      "&timestamp=" +
      new Date().getTime()
  );
}
// export function regAPI(user) {
//   return post("/api/v1/auth/reg", user);
// }

export function statusAPI() {
  return get("/login/status" + "?timestamp=" + new Date().getTime());
}

export function loginoutAPI() {
  return get("/logout" + "?timestamp=" + new Date().getTime());
}
//获取用户动态gettrendsAPI
export function gettrendsAPI(params) {
  return get("/user/event", params);
}

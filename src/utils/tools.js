//请求前缀，
export const serverUrl = "https://jarvan.cn";

//判断是否登陆
export function isLogined() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}
//设置token
export function setToken(val) {
  localStorage.setItem("token", val);
}
//取token
export function getToken() {
  return localStorage.getItem("token");
}
//移除token
export function removeToken() {
  localStorage.removeItem("token");
}

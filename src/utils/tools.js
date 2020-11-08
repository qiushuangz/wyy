//请求前缀，
export const serverUrl = "https://jarvan.cn";

//判断是否登陆
export function isLogined() {
  if (localStorage.getItem("uid")) {
    return true;
  }
  return false;
}
//设置uid
export function setuid(val) {
  localStorage.setItem("uid", val);
}
//取uid
export function getuid() {
  return localStorage.getItem("uid");
}
//移除uid
export function removeuid() {
  localStorage.removeItem("uid");
}

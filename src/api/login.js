import { get } from "@/utils/request";
// export function loginAPI() {
//   return get(
//     "/login/cellphone?phone=18603789747&password=954932" +
//     "&timestamp=" +
//     new Date().getTime()
//   );
// }
export function loginAPI(tel, password) {

  return get(
    "/login/cellphone?phone=" + tel + "&password=" + password +
    "&timestamp=" +
    new Date().getTime()
  );
}
export function quitAPI() {
  return get('/logout')
}
export function statusAPI() {
  return get('/login/status')
}
// 注册需要4个参数，tel：手机号，password：密码，captcha：验证码，nickname：昵称
export function RegAPI(tel, password, captcha, nickname) {
  return get(`/register/cellphone?phone=${tel}&password=${password}&captcha=${captcha}&nickname=${nickname}`)
}
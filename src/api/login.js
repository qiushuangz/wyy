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
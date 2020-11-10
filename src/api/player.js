import { get } from "@/utils/request";

//获取--音乐详情
export function getsongAPI(params) {
  return get("/song/detail", params);
}

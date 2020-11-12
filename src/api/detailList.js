import { get } from "@/utils/request";

export function detailListApi(params) {
  return get("/playlist/detail", params);
}
///playlist/detail?id=3164861650
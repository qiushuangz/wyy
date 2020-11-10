import { get } from "@/utils/request";
export function searchApi(params) {
  return get('/search/multimatch', params)
}
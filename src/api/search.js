import { get } from "@/utils/request";
export function searchApi(params) {
  return get('/search', params)
}

export function hotDetailApi(params) {
  return get('/search/hot/detail', params)
}




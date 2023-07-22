import hyRequest from "@/service"

export function getGoodsListData() {
  return hyRequest.post({
    url: "/goods/list"
  })
}

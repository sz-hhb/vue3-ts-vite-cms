import hyRequest from "@/service"

export function getGoodsListData() {
  return hyRequest.post({
    url: "/goods/list"
  })
}

export function deleteGoodById(id: number) {
  return hyRequest.delete({
    url: `/goods/${id}`
  })
}

import hyRequest from "@/service"

export function getAmountListData() {
  return hyRequest.get({
    url: "/goods/amount/list"
  })
}

export function getGoodsCountData() {
  return hyRequest.get({
    url: "/goods/category/count"
  })
}

export function getGoodsSaleData() {
  return hyRequest.get({
    url: "/goods/category/sale"
  })
}

export function getGoodsFavorData() {
  return hyRequest.get({
    url: "/goods/category/favor"
  })
}

export function getGoodsAddressSale() {
  return hyRequest.get({
    url: "/goods/address/sale"
  })
}

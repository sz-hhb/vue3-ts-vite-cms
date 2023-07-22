const contentConfig = {
  pageName: "goods",
  header: { title: "商品列表", btnText: "新建商品" },
  propsList: [
    { type: "selection", width: "60" },
    { type: "index", label: "序号", width: "80" },
    { prop: "name", label: "商品名称", width: "240", showOverflowTooltip: true },
    { type: "custom", prop: "oldPrice", label: "原价格", width: "100", slotName: "oldPrice" },
    { type: "custom", prop: "newPrice", label: "现价格", width: "100", slotName: "newPrice" },
    { type: "custom", prop: "imgUrl", label: "商品图片", width: "120", slotName: "img" },
    { type: "custom", prop: "status", label: "状态", width: "100", slotName: "status" },
    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },
    { type: "custom", label: "操作", slotName: "operation", width: "180" }
  ]
}

export default contentConfig

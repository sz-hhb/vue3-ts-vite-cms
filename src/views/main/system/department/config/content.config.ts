const contentConfig = {
  pageName: "department",
  header: { title: "部门列表", btnText: "新建部门" },
  propsList: [
    { type: "selection", width: "60" },
    { type: "index", label: "序号", width: "80" },
    { type: "normal", prop: "name", label: "部门名称", width: "140" },
    { type: "normal", prop: "leader", label: "部门领导", width: "160" },
    { type: "normal", prop: "parentId", label: "上级领导", width: "160" },
    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },
    { type: "custom", label: "操作", slotName: "operation", width: "180" }
  ]
}

export default contentConfig

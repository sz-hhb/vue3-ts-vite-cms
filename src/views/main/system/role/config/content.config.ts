const contentConfig = {
  pageName: "role",
  header: { title: "角色列表", btnText: "新建角色" },
  propsList: [
    { type: "selection", width: "60" },
    { type: "index", label: "序号", width: "80" },
    { type: "normal", prop: "name", label: "角色名称", width: "160" },
    { type: "normal", prop: "intro", label: "权限介绍", width: "240" },
    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },
    { type: "custom", label: "操作", slotName: "operation", width: "180" }
  ]
}

export default contentConfig

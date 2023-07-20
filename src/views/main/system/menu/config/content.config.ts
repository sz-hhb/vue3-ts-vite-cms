const contentConfig = {
  pageName: "menu",
  header: { title: "菜单列表", btnText: "新建菜单" },
  propsList: [
    { prop: "name", label: "菜单名称", width: "140" },
    { prop: "type", label: "级别", width: "160" },
    { prop: "url", label: "菜单url", width: "205" },
    { prop: "icon", label: "菜单icon", width: "200" },
    { prop: "sort", label: "sort", width: "160" },
    { prop: "permission", label: "权限", width: "180" },
    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },
    { type: "custom", label: "操作", slotName: "operation", width: "180" }
  ],
  childrenTree: {
    rowKey: "id",
    treeProps: { children: "children", hasChildren: "hasChildren" }
  }
}

export default contentConfig

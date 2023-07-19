import type { IModalConfig } from "@/components/page-modal/type"

const modalConfig: IModalConfig = {
  pageName: "department",
  header: {
    newText: "新建部门",
    editText: "编辑部门"
  },
  formItems: [
    { type: "input", label: "部门名称", prop: "name", placeholder: "请输入部门名称" },
    { type: "input", label: "部门领导", prop: "leader", placeholder: "请输入部门领导" },
    {
      type: "select",
      label: "选择部门",
      prop: "parentId",
      placeholder: "请输入上级部门",
      options: []
    }
  ]
}

export default modalConfig

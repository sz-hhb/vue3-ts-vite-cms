import type { IModalConfig } from "@/components/page-modal/type"

const modalConfig: IModalConfig = {
  pageName: "role",
  header: {
    newText: "新建角色",
    editText: "编辑角色"
  },
  formItems: [
    { type: "input", label: "角色名称", prop: "name", placeholder: "请输入角色名称" },
    { type: "input", label: "角色权限", prop: "intro", placeholder: "请输入角色权限" }
  ]
}

export default modalConfig

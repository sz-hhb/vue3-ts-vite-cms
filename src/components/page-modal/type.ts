export interface IFormItems {
  type: "input" | "select" | "date-picker" | "custom"
  label: string
  prop: string
  placeholder: string
  slotName?: string
  options?: { label: string | number; value: string | number | boolean | object }[]
}

export interface IModalConfig {
  pageName: string
  header: {
    newText: string
    editText: string
  }
  formItems: IFormItems[]
}

export interface IModalProps {
  modalConfig: IModalConfig
  otherInfo?: any
}

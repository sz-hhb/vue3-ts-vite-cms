import { defineStore } from "pinia"
import { getEntireDepartments, getEntireRoles, getEntireMenus } from "@/service/main/main"

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentsRes = await getEntireDepartments()
      const menus = await getEntireMenus()

      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentsRes.data.list
      this.entireMenus = menus.data.list
    }
  }
})

export default useMainStore

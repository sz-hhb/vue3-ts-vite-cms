import { defineStore } from "pinia"
import { loginAccountRequest, getUserInfoById, getUserMenusByRoleId } from "@/service/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import { mapMenuListToPermissions, mapMenusToRoutes } from "@/utils/map-menus"
import { TOKEN } from "@/global/constants"
import router from "@/router"
import useMainStore from "../main/main"

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any
  permissions: string[]
}

const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: localCache.getCache(TOKEN) ?? "",
    userInfo: localCache.getCache("userInfo") ?? {},
    userMenu: localCache.getCache("userMenu") ?? [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await loginAccountRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(TOKEN, this.token)

      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      const userMenuRes = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenuRes.data
      this.userMenu = userMenus

      localCache.setCache("userInfo", userInfoRes.data)
      localCache.setCache("userMenu", userMenuRes.data)

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const permissions = mapMenuListToPermissions(userMenus)
      this.permissions = permissions

      // 菜单映射到路由 基于菜单的动态路由管理
      const routes = mapMenusToRoutes(userMenus)
      for (const route of routes) {
        router.addRoute("main", route)
      }

      router.push("/main")
    },
    loadLocalCacheAction() {
      const token = localCache.getCache("token")
      const userInfo = localCache.getCache("userInfo")
      const userMenu = localCache.getCache("userMenu")
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        const permissions = mapMenuListToPermissions(userMenu)
        this.permissions = permissions

        const routes = mapMenusToRoutes(userMenu)
        for (const route of routes) {
          router.addRoute("main", route)
        }
      }
    }
  }
})

export default useLoginStore

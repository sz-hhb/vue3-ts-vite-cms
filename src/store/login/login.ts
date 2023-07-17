import { defineStore } from "pinia"
import { loginAccountRequest, getUserInfoById, getUserMenusByRoleId } from "@/service/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import { TOKEN } from "@/global/constants"
import router from "@/router"

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any
}

const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: localCache.getCache(TOKEN) ?? "",
    userInfo: localCache.getCache("userInfo") ?? {},
    userMenu: localCache.getCache("userMenu") ?? []
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
      this.userMenu = userMenuRes.data

      localCache.setCache("userInfo", userInfoRes.data)
      localCache.setCache("userMenu", userMenuRes.data)

      router.push("/main")
    }
  }
})

export default useLoginStore

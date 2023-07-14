import { defineStore } from "pinia"
import { loginAccountRequest } from "@/service/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import router from "@/router"

const TOKEN = "token"

const useLoginStore = defineStore("login", {
  state: () => ({
    id: "",
    name: "",
    token: localCache.getCache(TOKEN) ?? ""
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginRes = await loginAccountRequest(account)
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token

      localCache.setCache(TOKEN, this.token)

      router.push("/main")
    }
  }
})

export default useLoginStore

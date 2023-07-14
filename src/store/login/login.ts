import { loginAccountRequest } from "@/service/login/login"
import { defineStore } from "pinia"

const useLoginStore = defineStore("login", {
  state: () => ({
    id: "",
    name: "",
    token: ""
  }),
  actions: {
    async loginAccountAction(account: any) {
      const res = await loginAccountRequest(account)
      this.id = res.data.id
      this.name = res.data.name
      this.token = res.data.token
    }
  }
})

export default useLoginStore

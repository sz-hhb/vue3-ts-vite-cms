import { createPinia } from "pinia"
import type { App } from "vue"
import useLoginStore from "./login/login"

const pinia = createPinia()

const registerStore = (app: App<Element>) => {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore

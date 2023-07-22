import { localCache } from "@/utils/cache"
import { BASE_URL, TIMEOUT } from "./config"
import HYRequest from "./request"
import { TOKEN } from "@/global/constants"

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = "Bearer " + token
      }
      return config
    }
  }
})

export default hyRequest

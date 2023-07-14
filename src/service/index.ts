import { BASE_URL, TIMEOUT } from "./config"
import HYRequest from "./request"

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

export default hyRequest

import useLoginStore from "@/store/login/login"
import { storeToRefs } from "pinia"

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = storeToRefs(loginStore)

  return !!permissions.value.find((item) => item.includes(permissionID))
}

export default usePermissions

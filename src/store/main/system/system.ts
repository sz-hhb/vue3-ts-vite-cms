import { defineStore } from "pinia"
import {
  getUsersListData,
  deleteUserById,
  newUserData,
  editUserData
} from "@/service/main/system/system"
import type { ISystemState } from "./type"

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    userTotalCount: 0
  }),
  actions: {
    async fetchUsersListAction(queryInfo: any) {
      const usersListRes = await getUsersListData(queryInfo)
      const { list, totalCount } = usersListRes.data
      this.usersList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)
      this.fetchUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newRes = await newUserData(userInfo)
      console.log(newRes)
      this.fetchUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editRes = await editUserData(id, userInfo)
      console.log(editRes)
      this.fetchUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore

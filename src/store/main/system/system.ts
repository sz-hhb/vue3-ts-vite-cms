import { defineStore } from "pinia"
import {
  getUsersListData,
  deleteUserById,
  newUserData,
  editUserData,
  getPageListData,
  deletePageById,
  newPageData,
  editPageData
} from "@/service/main/system/system"
import type { ISystemState } from "./type"

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
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
    },

    async fetchPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await getPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListRes.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageById(pageName, id)
      console.log(deleteRes)
      this.fetchPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newRes = await newPageData(pageName, pageInfo)
      console.log(newRes)
      this.fetchPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editRes = await editPageData(pageName, id, pageInfo)
      console.log(editRes)
      this.fetchPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore

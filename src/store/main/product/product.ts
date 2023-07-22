import { defineStore } from "pinia"
import { getGoodsListData } from "@/service/main/product/product"

interface IProductState {
  goodsList: any[]
}

const useProductStore = defineStore("product", {
  state: (): IProductState => ({
    goodsList: []
  }),
  actions: {
    async fetchGoodsListDataAction() {
      const res = await getGoodsListData()
      this.goodsList = res.data.list
    }
  }
})

export default useProductStore

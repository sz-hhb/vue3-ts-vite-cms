import { defineStore } from "pinia"
import {
  getAmountListData,
  getGoodsCountData,
  getGoodsSaleData,
  getGoodsFavorData,
  getGoodsAddressSale
} from "@/service/main/analysis/analysis"

interface IAnalysisState {
  amountList: any[]
  goodsCountList: any[]
  goodsSaleList: any[]
  goodsFavorList: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore("analysis", {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCountList: [],
    goodsSaleList: [],
    goodsFavorList: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAmountListData() {
      const amountRes = await getAmountListData()
      this.amountList = amountRes.data
    },
    async fetchGoodsCountListAction() {
      const countRes = await getGoodsCountData()
      this.goodsCountList = countRes.data
    },
    async fetchGoodsSaleListAction() {
      const saleRes = await getGoodsSaleData()
      this.goodsSaleList = saleRes.data
    },
    async fetchGoodsFavorListAction() {
      const favorRes = await getGoodsFavorData()
      this.goodsFavorList = favorRes.data
    },
    async fetchGoodsAddressSaleAction() {
      const addressSaleRes = await getGoodsAddressSale()
      this.goodsAddressSale = addressSaleRes.data
    }
  }
})

export default useAnalysisStore

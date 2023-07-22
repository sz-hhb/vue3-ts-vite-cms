<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <template v-for="item in amountList" :key="item">
        <el-col v-bind="{ xs: 24, sm: 24, md: 12, lg: 12, xl: 6 }">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 7, xl: 7 }">
        <chart-card title="所有商品的个数">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 10, xl: 10 }">
        <chart-card title="不同城市的销量">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 7, xl: 7 }">
        <chart-card title="所有商品的销量">
          <rose-echart :rose-data="showGoodsCategorySale" />
        </chart-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12 }">
        <chart-card title="所有商品的收藏">
          <line-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12 }">
        <chart-card title="所有商品的收藏">
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import CountCard from "./c-cpns/CountCard.vue"
import ChartCard from "./c-cpns/ChartCard.vue"
import useAnalysisStore from "@/store/main/analysis/analysis"
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from "@/components/page-echarts"

const analysisStore = useAnalysisStore()
analysisStore.fetchAmountListData()
analysisStore.fetchGoodsCountListAction()
analysisStore.fetchGoodsSaleListAction()
analysisStore.fetchGoodsFavorListAction()
analysisStore.fetchGoodsAddressSaleAction()

const { amountList, goodsCountList, goodsSaleList, goodsFavorList, goodsAddressSale } =
  storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() => {
  return goodsCountList.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const showGoodsCategorySale = computed(() => {
  return goodsSaleList.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsFavorList.value.map((item) => item.name)
  const values = goodsFavorList.value.map((item) => {
    if (item.goodsFavor) {
      return item.goodsFavor
    } else {
      return 0
    }
  })
  return { labels, values }
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
}
</style>

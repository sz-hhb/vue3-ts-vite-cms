<template>
  <div class="pie-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import BaseEchart from "./BaseEchart.vue"
import type { EChartsOption } from "echarts"
import type { IEchartValueType } from "../types"

const props = defineProps<{
  pieData: IEchartValueType[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "top"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        bottom: "-15%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

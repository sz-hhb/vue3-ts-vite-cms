<template>
  <div class="line-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import BaseEchart from "./BaseEchart.vue"
import type { EChartsOption } from "echarts"

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.labels,
      axisLabel: {
        interval: 0 //全部显示x轴
      }
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: props.values,
        type: "line",
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

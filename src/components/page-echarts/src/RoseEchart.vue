<template>
  <div class="rose-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import BaseEchart from "./BaseEchart.vue"
import type { EChartsOption } from "echarts"
import type { IEchartValueType } from "../types"

const props = defineProps<{
  roseData: IEchartValueType[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "销量",
        type: "pie",
        radius: [10, 160],
        center: ["50%", "50%"],
        bottom: "-20%",
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>

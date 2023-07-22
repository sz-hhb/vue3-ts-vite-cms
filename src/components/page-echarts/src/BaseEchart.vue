<template>
  <div class="base-echart">
    <div ref="echartRef" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from "vue"
import * as echarts from "echarts"
import type { EChartsOption, ECharts } from "echarts"
import ChinaJson from "../data/china.json"

echarts.registerMap("china", ChinaJson as any)

const props = defineProps<{
  option: EChartsOption
}>()

const echartRef = ref<HTMLElement>()
let echartInstance: ECharts | null = null

onMounted(() => {
  echartInstance = echarts.init(echartRef.value!, "light", { renderer: "canvas" })

  watchEffect(() => {
    props.option && echartInstance?.setOption(props.option, true)
  })

  window.addEventListener("resize", resizeEchart)
})

onUnmounted(() => {
  echartInstance?.dispose()

  window.removeEventListener("resize", resizeEchart)
})

function resizeEchart() {
  echartInstance?.resize()
}
</script>

<style scoped lang="less">
.base-echart {
  width: 100%;
}
</style>

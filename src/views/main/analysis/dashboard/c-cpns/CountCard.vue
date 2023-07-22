<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { CountUp } from "countup.js"

interface IProps {
  amount: string
  title: string
  subtitle: string
  number1: number
  number2: number
  tips: string
}

const props = defineProps<IProps>()

const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()

const countUpOption = {
  prefix: props.amount === "saleroom" ? "¥" : ""
}
onMounted(() => {
  const countUp1 = new CountUp(count1Ref.value!, props.number1, countUpOption)
  const countUp2 = new CountUp(count2Ref.value!, props.number1, countUpOption)
  countUp1.start()
  countUp2.start()
})
</script>

<style scoped lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  height: 138px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    gap: 5px;
    height: 38px;
    line-height: 38px;
    letter-spacing: 1px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>

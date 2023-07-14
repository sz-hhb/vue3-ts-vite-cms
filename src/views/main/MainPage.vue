<template>
  <div class="main">
    <h2>main:{{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">change</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from "@/store/counter"

const counterStore = useCounterStore()

const changeCounter = () => {
  counterStore.changeCounterAction(99)
}
</script>

<style scoped lang="less">
.main {
}
</style>

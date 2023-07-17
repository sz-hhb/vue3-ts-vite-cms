<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28">
        <component :is="isFold ? 'fold' : 'expand'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import HeaderInfo from "./c-cpns/HeaderInfo.vue"

const emit = defineEmits<{
  foldChange: [value: boolean]
}>()

const isFold = ref(false)
const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emit("foldChange", isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;

  .menu-icon {
    display: flex;
    align-items: center;
    font-size: 28px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>

<template>
  <div class="chart-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="less"></style>

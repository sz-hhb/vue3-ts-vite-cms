<template>
  <div class="menu">
    <page-content :content-config="contentConfig">
      <template #createAt="scope">{{ formatUTC(scope.row.createAt) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope.row.updateAt) }}</template>
      <template #operation>
        <el-button text type="primary" icon="Edit">编辑</el-button>
        <el-button text type="danger" icon="Delete">删除</el-button>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from "@/components/page-content/PageContent.vue"
import contentConfig from "./config/content.config"
import { formatUTC } from "@/utils/format"
</script>

<style scoped>
.menu {
  .el-button {
    padding: 5px 8px;
    margin-left: 0;
  }
}
</style>

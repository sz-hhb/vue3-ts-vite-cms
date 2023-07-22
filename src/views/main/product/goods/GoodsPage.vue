<template>
  <div class="goods-page">
    <page-content :content-config="contentConfig">
      <template #oldPrice="scope">
        <span>{{ "¥" + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ "¥" + scope.row.newPrice }}</span>
      </template>
      <template #img="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
        />
      </template>
      <template #status="scope">
        <el-button plain :type="scope.row.status ? 'primary' : 'danger'">
          {{ scope.row.status ? "上架" : "下架" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ formatUTC(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatUTC(scope.row.updateAt) }}</span>
      </template>
      <template #operation>
        <el-button text type="primary" icon="Edit">编辑</el-button>
        <el-button text type="danger" icon="Delete">删除</el-button>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="goods">
import PageContent from "@/components/page-content/PageContent.vue"
import contentConfig from "./config/content.config"
import useProductStore from "@/store/main/product/product"
import { formatUTC } from "@/utils/format"

const productStore = useProductStore()
productStore.fetchGoodsListDataAction()
</script>

<style scoped lang="less">
.el-button {
  padding: 5px 8px;
  margin-left: 0;
}
</style>

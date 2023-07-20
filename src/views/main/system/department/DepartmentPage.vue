<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content ref="contentRef" :content-config="contentConfig" @new-click="handleNewClick">
      <template #createAt="scope">{{ formatUTC(scope.row.createAt) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope.row.updateAt) }}</template>
      <template #operation="scope">
        <el-button
          v-if="isUpdate"
          text
          type="primary"
          icon="Edit"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          text
          type="danger"
          icon="Delete"
          @click="handleDeleteClick(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from "vue"
import PageSearch from "@/components/page-search/PageSearch.vue"
import PageContent from "@/components/page-content/PageContent.vue"
import PageModal from "@/components/page-modal/PageModal.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import modalConfig from "./config/modal.config"
import { formatUTC } from "@/utils/format"
import useSystemStore from "@/store/main/system/system"
import useMainStore from "@/store/main/main"
import usePageContent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"
import usePermissions from "@/hooks/usePermissions"

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

const isUpdate = usePermissions("department:update")
const isDelete = usePermissions("department:delete")

const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal()

const systemStore = useSystemStore()
const handleDeleteClick = (id: number) => {
  systemStore.deletePageByIdAction(contentConfig.pageName, id)
}
</script>

<style scoped lang="less">
.el-button {
  padding: 5px 8px;
  margin-left: 0;
}
</style>

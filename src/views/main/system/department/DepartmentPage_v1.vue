<template>
  <div class="department">
    <page-search @reset-click="handleResetClick" @query-click="handleQueryClick" />
    <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from "vue"
import PageSearch from "./c-cpns/PageSearch.vue"
import PageContent from "./c-cpns/PageContent.vue"
import PageModal from "./c-cpns/PageModal.vue"

const contentRef = ref<InstanceType<typeof PageContent>>()
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo)
}

const modalRef = ref<InstanceType<typeof PageModal>>()
const handleNewClick = () => {
  modalRef.value?.setModalVisible()
}
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>

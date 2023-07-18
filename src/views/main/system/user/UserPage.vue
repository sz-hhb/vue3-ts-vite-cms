<template>
  <div class="user">
    <user-search @reset-click="handleResetClick" @query-click="handleQueryClick" />
    <user-content ref="contentRef" @new-click="handleNewUserClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from "vue"
import UserSearch from "./c-cpns/UserSearch.vue"
import UserContent from "./c-cpns/UserContent.vue"
import UserModal from "./c-cpns/UserModal.vue"

const contentRef = ref<InstanceType<typeof UserContent>>()
const handleResetClick = () => {
  contentRef.value?.fetchUsersListData()
}
const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchUsersListData(formData)
}

const modalRef = ref<InstanceType<typeof UserModal>>()
const handleNewUserClick = () => {
  modalRef.value?.setModalVisible()
}
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>

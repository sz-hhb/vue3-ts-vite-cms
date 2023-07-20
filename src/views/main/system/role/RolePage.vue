<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content ref="contentRef" :content-config="contentConfig" @new-click="handleNewClick">
      <template #createAt="scope">{{ formatUTC(scope.row.createAt) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope.row.updateAt) }}</template>
      <template #operation="scope">
        <el-button text type="primary" icon="Edit" @click="handleEditClick(scope.row)">
          编辑
        </el-button>
        <el-button text type="danger" icon="Delete" @click="handleDeleteClick(scope.row.id)">
          删除
        </el-button>
      </template>
    </page-content>
    <page-modal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check="handleTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from "vue"
import { storeToRefs } from "pinia"
import PageSearch from "@/components/page-search/PageSearch.vue"
import PageContent from "@/components/page-content/PageContent.vue"
import PageModal from "@/components/page-modal/PageModal.vue"
import searchConfig from "../role/config/search.config"
import contentConfig from "../role/config/content.config"
import modalConfig from "../role/config/modal.config"
import { formatUTC } from "@/utils/format"
import { mapMenuListToIds } from "@/utils/map-menus"
import usePageContent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"
import useSystemStore from "@/store/main/system/system"
import useMainStore from "@/store/main/main"
import { ElTree } from "element-plus"
import "element-plus/theme-chalk/el-tree.css"

const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(newCallback, editCallback)

const systemStore = useSystemStore()
const handleDeleteClick = (id: number) => {
  systemStore.deletePageByIdAction(contentConfig.pageName, id)
}

const defaultProps = {
  children: "children",
  label: "name"
}

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const treeRef = ref<InstanceType<typeof ElTree>>()
const otherInfo = ref({})
const handleTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallback(itemData: any) {
  const ids = mapMenuListToIds(itemData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(ids)
  })
}
</script>

<style scoped lang="less">
.el-button {
  padding: 5px 8px;
  margin-left: 0;
}
</style>

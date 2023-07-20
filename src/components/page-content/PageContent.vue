<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig?.header?.btnText ?? "新建列表" }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div v-if="pageTotalCount" class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import useSystemStore from "@/store/main/system/system"
import usePermission from "@/hooks/usePermissions"

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnText?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  newClick: []
  editClick: [value: any]
}>()

const isQuery = usePermission(`${props.contentConfig.pageName}:query`)
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
// const isUpdate = permissions.value.includes(`${props.contentConfig.pageName}:update`)
// const isDelete = permissions.value.includes(`${props.contentConfig.pageName}:delete`)
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
const { pageList, pageTotalCount } = storeToRefs(systemStore)

systemStore.$onAction(({ name, after }) => {
  if (
    name === "newPageDataAction" ||
    name === "editPageDataAction" ||
    name === "deletePageByIdAction"
  ) {
    // 成功之后执行回调
    after(() => {
      currentPage.value = 1
    })
  }
})

fetchPageListData()

const handleCurrentChange = () => {
  fetchPageListData()
}
const handleSizeChange = () => {
  fetchPageListData()
}

function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  systemStore.fetchPageListAction(props.contentConfig.pageName, queryInfo)
}

// const handleDeleteClick = (id: number) => {
//   systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
// }

const handleNewUserClick = () => {
  emit("newClick")
}

// const handleEditClick = (itemData: any) => {
//   emit("editClick", itemData)
// }

defineExpose({
  fetchPageListData
})
</script>

<style scoped lang="less">
.user-content {
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }

  .el-button {
    height: 36px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    padding: 5px 8px;
    margin-left: 0;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

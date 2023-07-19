<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="name" label="部门名称" width="140" />
        <el-table-column align="center" prop="leader" label="部门领导" width="160" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="160" />
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button text type="primary" icon="Edit" @click="handleEditClick(scope.row)">
              编辑
            </el-button>
            <el-button text type="danger" icon="Delete" @click="handleDeleteClick(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
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
import { formatUTC } from "@/utils/format"

const emit = defineEmits<{
  newClick: []
  editClick: [value: any]
}>()

const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
const { pageList, pageTotalCount } = storeToRefs(systemStore)

fetchPageListData()

const handleCurrentChange = () => {
  fetchPageListData()
}
const handleSizeChange = () => {
  fetchPageListData()
}

function fetchPageListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  systemStore.fetchPageListAction("department", queryInfo)
}

const handleDeleteClick = (id: number) => {
  systemStore.deletePageByIdAction("department", id)
}

const handleNewUserClick = () => {
  emit("newClick")
}

const handleEditClick = (itemData: any) => {
  emit("editClick", itemData)
}

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

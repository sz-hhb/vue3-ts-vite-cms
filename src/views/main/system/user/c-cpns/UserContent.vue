<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="name" label="用户名" width="140" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="120" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="140" />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button size="small" plain :type="scope.row.enable ? 'primary' : 'danger'">
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="departmentId" label="部门" width="120" />
        <el-table-column align="center" prop="roleId" label="角色" width="120" />
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
        :total="userTotalCount"
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
const { usersList, userTotalCount } = storeToRefs(systemStore)

fetchUsersListData()

const handleCurrentChange = () => {
  fetchUsersListData()
}
const handleSizeChange = () => {
  fetchUsersListData()
}

function fetchUsersListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  const queryInfo = { ...info, ...formData }
  systemStore.fetchUsersListAction(queryInfo)
}

const handleDeleteClick = (id: number) => {
  systemStore.deleteUserByIdAction(id)
}

const handleNewUserClick = () => {
  emit("newClick")
}

const handleEditClick = (itemData: any) => {
  emit("editClick", itemData)
}

defineExpose({
  fetchUsersListData
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

<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreate ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称">
            <el-input v-model="formData.name" prop="name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导">
            <el-input v-model="formData.leader" prop="leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select
              v-model="formData.parentId"
              prop="parentId"
              placeholder="请选择上级部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { storeToRefs } from "pinia"
import useMainStore from "@/store/main/main"
import useSystemStore from "@/store/main/system/system"

const dialogVisible = ref(false)

const formData = reactive<any>({
  name: "",
  leader: "",
  parentId: ""
})

const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)
const systemStore = useSystemStore()

const isCreate = ref(true)
const editData = ref()
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isCreate.value = isNew
  if (!isNew && itemData) {
    editData.value = itemData
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    editData.value = null
    for (const key in formData) {
      formData[key] = ""
    }
  }
}

const handleConfirmClick = () => {
  dialogVisible.value = false
  if (!isCreate.value) {
    systemStore.editPageDataAction("department", editData.value.id, formData)
  } else {
    systemStore.newPageDataAction("department", formData)
  }
}

defineExpose({
  setModalVisible
})
</script>

<style scoped lang="less">
.user-modal {
  .form {
    padding: 0 20px;
  }
}
</style>

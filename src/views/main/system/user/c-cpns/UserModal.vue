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
          <el-form-item label="用户名">
            <el-input v-model="formData.name" prop="name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="formData.realname" prop="realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isCreate" label="密码">
            <el-input
              v-model="formData.password"
              prop="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="formData.cellphone" prop="cellphone" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select
              v-model="formData.roleId"
              prop="roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select
              v-model="formData.departmentId"
              prop="departmentId"
              placeholder="请选择部门"
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

const emit = defineEmits<{
  resetPaginationValue: []
}>()

const dialogVisible = ref(false)

const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
})

const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
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
    // systemStore.editUserDataAction(editData.value.id, formData)
    editUserData()
  } else {
    // systemStore.newUserDataAction(formData)
    newUserData()
  }
}

async function editUserData() {
  try {
    await systemStore.editUserDataAction(editData.value.id, formData)
    emit("resetPaginationValue")
  } catch (e) {
    console.log(e)
  }
}

async function newUserData() {
  try {
    await systemStore.newUserDataAction(formData)
    emit("resetPaginationValue")
  } catch (e) {
    console.log(e)
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

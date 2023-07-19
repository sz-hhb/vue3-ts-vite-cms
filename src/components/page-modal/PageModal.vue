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
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from "@/store/main/system/system"
import type { IModalProps } from "./type"

const props = defineProps<IModalProps>()

const dialogVisible = ref(false)

let initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = ""
}
const formData = reactive<any>(initialForm)

const systemStore = useSystemStore()

const isCreate = ref(true)
const editData = ref()
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isCreate.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    editData.value = itemData
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    // 新建数据
    editData.value = null
    for (const key in formData) {
      formData[key] = ""
    }
  }
}

const handleConfirmClick = () => {
  dialogVisible.value = false
  if (!isCreate.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, formData)
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

<template>
  <div class="user-search">
    <el-form ref="formRef" :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" placeholder="请输入查询的部门领导" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" type="primary" icon="Search" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import type { FormInstance } from "element-plus"

const emit = defineEmits<{
  resetClick: []
  queryClick: [value: any]
}>()

const searchForm = reactive({
  name: "",
  leader: "",
  createAt: ""
})
const formRef = ref<FormInstance>()
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit("resetClick")
}
const handleQueryClick = () => {
  emit("queryClick", searchForm)
}
</script>

<style scoped lang="less">
.user-search {
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    padding: 0 50px 10px 0;
    text-align: right;

    .el-button {
      height: 36px;
    }
  }
}
</style>

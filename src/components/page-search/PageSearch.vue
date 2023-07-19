<template>
  <div class="user-search">
    <el-form
      ref="formRef"
      :model="searchForm"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
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
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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

interface IProps {
  searchConfig: {
    formItems: any[]
    labelWidth?: string
  }
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  resetClick: []
  queryClick: [value: any]
}>()

let initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ""
}

const searchForm = reactive(initialForm)
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

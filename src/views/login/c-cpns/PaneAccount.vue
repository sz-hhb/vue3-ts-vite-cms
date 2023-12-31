<template>
  <div class="pane-account">
    <el-form ref="formRef" :model="account" :rules="accountRules" label-width="60px">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import useLoginStore from "@/store/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"

const CHANGE_NAME = "name"
const CHANGE_PASSWORD = "password"
const account = reactive<IAccount>({
  name: localCache.getCache(CHANGE_NAME) ?? "",
  password: localCache.getCache(CHANGE_PASSWORD) ?? ""
})

const accountRules: FormRules = {
  name: [
    { required: true, message: "必须输入帐号信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "必须是6-20数字或字母组成~", trigger: "blur" }
  ],
  password: [
    { required: true, message: "必须输入密码信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{3,}$/, message: "必须是3位以上数字或字母组成~", trigger: "blur" }
  ]
}

const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
const loginAction = (isKeepPwd: boolean) => {
  formRef?.value?.validate((valid: boolean) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password })

      if (isKeepPwd) {
        localCache.setCache(CHANGE_NAME, name)
        localCache.setCache(CHANGE_PASSWORD, password)
      } else {
        localCache.removeCache(CHANGE_NAME)
        localCache.removeCache(CHANGE_PASSWORD)
      }
    } else {
      ElMessage.error("请输入正确格式的帐号或密码")
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.pane-account {
}
</style>

<template>
  <div class="login-panel">
    <h2 class="title">弘源后台管理系统</h2>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <el-icon><UserFilled /></el-icon>
            <span>帐号登录</span>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import PaneAccount from "./PaneAccount.vue"
import PanePhone from "./PanePhone.vue"
import { localCache } from "@/utils/cache"

const activeName = ref("account")
const isKeepPwd = ref<boolean>(localCache.getCache("isKeepPwd") ?? false)
watch(isKeepPwd, (newValue) => {
  localCache.setCache("isKeepPwd", newValue)
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()

const handleLoginClick = () => {
  if (activeName.value === "account") {
    accountRef.value?.loginAction(isKeepPwd.value)
  } else {
    console.log("手机登录")
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    margin-bottom: 15px;
    text-align: center;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>

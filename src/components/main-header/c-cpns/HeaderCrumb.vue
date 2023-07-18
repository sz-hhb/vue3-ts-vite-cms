<template>
  <div class="header-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.path">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import useLoginStore from "@/store/login/login"
import { mapPathToBreadcrumbs } from "@/utils/map-menus"

const route = useRoute()
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenu)
})
</script>

<style scoped lang="less"></style>

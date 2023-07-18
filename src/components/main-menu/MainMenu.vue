<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <div v-show="!isFold" class="title">弘源管理系统</div>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical"
        :collapse="isFold"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import useLoginStore from "@/store/login/login"
import { mapPathToMenus } from "@/utils/map-menus"

withDefaults(defineProps<{ isFold: boolean }>(), { isFold: false })

const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu

const handleMenuItemClick = (item: any) => {
  router.push(item.url)
}

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenus(route.path, userMenu)
  return pathMenu.id + ""
})
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 10px;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}

:deep(.el-menu) {
  border-right: none;
  user-select: none;

  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      color: #fff;
      background-color: #0a60bd;
    }
  }
}
</style>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MainMenu from "@/components/main-menu/MainMenu.vue"
import MainHeader from "@/components/main-header/MainHeader.vue"

const isFold = ref(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s ease;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    text-align: center;
    color: #333;
  }

  .el-main {
    color: #333;
    background-color: #f0f2f5;
  }
}
</style>

<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache(TOKEN)
  router.push("/login")
}
</script>

<style scoped lang="less">
.main {
}
</style>

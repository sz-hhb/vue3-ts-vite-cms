<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotSquare /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          ></el-avatar>
          <span class="name">{{ userName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import useLoginStore from "@/store/login/login"

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache(TOKEN)
  router.push("/login")
}

const loginStore = useLoginStore()
const userName = computed(() => {
  return loginStore.userInfo.name
})
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;

  .operation {
    margin-right: 20px;

    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 43px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 6px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: red;
      }
    }
  }

  .info {
    .el-dropdown,
    .user-info {
      &:focus-visible {
        outline: unset;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .name {
        margin-left: 8px;
      }
    }

    :global(.el-dropdown-menu__item) {
      padding: 6px 22px;
      line-height: 36px !important;
    }
  }
}
</style>

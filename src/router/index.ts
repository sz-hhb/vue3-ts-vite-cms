import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import { firstMenu } from "@/utils/map-menus"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    component: () => import("../views/login/LoginPage.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/main/MainPage.vue")
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("../views/not-found/NotFound.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localCache.getCache(TOKEN)
  if (!token && to.path.startsWith("/main")) {
    return "/login"
  }

  if (to.path === "/main") {
    return firstMenu?.url
  }
})

export default router

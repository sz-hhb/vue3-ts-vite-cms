import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("../views/login/LoginPage.vue")
  },
  {
    path: "/main",
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

export default router

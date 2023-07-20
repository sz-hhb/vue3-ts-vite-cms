import type { RouteRecordRaw } from "vue-router"

/**
 * 获取所有的路由文件
 * @returns 路由对象数组
 */
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // 获取router下的所有ts文件
  // eager: true  直接引入所有的模块
  const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", { eager: true })

  // 将加载的对象放在localRoutes里
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
/**
 * 根据菜单中的url去匹配对应的路由
 * @param userMenus 所有菜单
 * @returns 匹配到的路由组成的数组
 */
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = subMenu
    }
  }

  return routes
}

/**
 * 根据路径去显示匹配的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 * @returns 当前活跃的菜单项
 */
export function mapPathToMenus(path: string, userMenus: any[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenus(path, menu.children)
      if (findMenu) return findMenu
    } else if (menu.type === 2 && path === menu.url) {
      return menu
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
/**
 * 根据路径匹配对应的面包屑
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 * @returns 面包屑的路径数组
 */
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenus(path, menu.children)
      if (findMenu) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
      }
    } else if (menu.type === 2 && path === menu.url) {
      return menu
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList 菜单列表
 * @returns 权限的id列表
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}

/**
 * 菜单映射到按钮权限
 * @param menuList 所有菜单
 * @returns 权限列表
 */
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }

  recurseGetPermissions(menuList)

  return permissions
}

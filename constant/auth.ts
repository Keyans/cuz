// 定义不需要登录验证的路由列表
export const publicRoutes = [
  '/dashboard/sourcing',
  '/dashboard/sourcing/list',
  '/dashboard/sourcing/[id]',
  '/login',
  '/register',
  '/',
  '/products'
] as const

// 定义需要隐藏侧边栏的路由列表
export const hideSidebarRoutes = [
  '/dashboard/sourcing',
  '/dashboard/sourcing/list',
  '/dashboard/sourcing/[id]'
] as const

// 检查路由是否在公开路由列表中
export const isPublicRoute = (path: string): boolean => {
  // 检查完整路径匹配
  if (publicRoutes.includes(path as any)) {
    return true
  }
  
  // 检查动态路由匹配（例如：/products/[slug]）
  return publicRoutes.some(route => {
    if (route.includes('[') && route.includes(']')) {
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
      return new RegExp(`^${routePattern}$`).test(path)
    }
    return false
  })
}

// 检查路由是否需要隐藏侧边栏
export const shouldHideSidebar = (path: string, isAuthenticated: boolean): boolean => {
  // 如果已登录，不隐藏侧边栏
  if (isAuthenticated) {
    return false;
  }
  
  // 检查完整路径匹配
  if (hideSidebarRoutes.includes(path as any)) {
    return true
  }
  
  // 检查动态路由匹配
  return hideSidebarRoutes.some(route => {
    if (route.includes('[') && route.includes(']')) {
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
      return new RegExp(`^${routePattern}$`).test(path)
    }
    return false
  })
}
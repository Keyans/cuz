import { isPublicRoute } from '~/constant/auth'

// Middleware to check if user is authenticated and redirect if not
export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side
  if (process.server) return

  // Check if user is authenticated
  const authStore = useAuthStore()

  // Initialize auth store
  authStore.init()

  // Check if the current route is a public route that doesn't require authentication
  if (isPublicRoute(to.path)) {
    return
  }

  // If user is not authenticated and is trying to access a protected route
  if (!authStore.isAuthenticated) {
    // Redirect to login page with return URL
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

// Middleware to check if user is authenticated and redirect if not
export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side
  if (process.server) return

  // Check if user is authenticated
  const authStore = useAuthStore()

  // Initialize auth store
  authStore.init()

  // If user is not authenticated and is trying to access a protected route
  if (!authStore.isAuthenticated) {
    // Redirect to login page with return URL
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

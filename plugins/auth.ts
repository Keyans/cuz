// Plugin to initialize the auth store
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(({ $pinia }) => {
  // Initialize auth store on client side
  if (process.client) {
    const authStore = useAuthStore($pinia)
    authStore.init()
  }
})

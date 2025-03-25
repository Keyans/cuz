import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name: string
  role?: string
  avatar?: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    // Set user and token from local storage on initialization
    init() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
    },

    // Login action
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        // Check if it's the demo account
        const isDemoAccount = credentials.email === 'demo@example.com' && credentials.password === 'password123'

        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a successful login
        const response = await new Promise<{user: User, token: string}>((resolve) => {
          setTimeout(() => {
            if (isDemoAccount) {
              // Demo user with specific role
              resolve({
                user: {
                  id: 'demo-user',
                  email: credentials.email,
                  name: '体验账号用户',
                  role: 'demo',
                  avatar: '/assets/demo-avatar.png'
                },
                token: 'demo-jwt-token',
              })
            } else {
              // Regular user
              resolve({
                user: {
                  id: '1',
                  email: credentials.email,
                  name: 'Regular User',
                  role: 'user'
                },
                token: 'fake-jwt-token',
              })
            }
          }, 1000)
        })

        this.user = response.user
        this.token = response.token

        // Store in localStorage
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))

        return response
      } catch (err: any) {
        this.error = err.message || 'Failed to login'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Register action
    async register(credentials: RegisterCredentials) {
      this.loading = true
      this.error = null

      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a successful registration
        const response = await new Promise<{user: User, token: string}>((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: '1',
                email: credentials.email,
                name: credentials.name,
                role: 'user'
              },
              token: 'fake-jwt-token',
            })
          }, 1000)
        })

        this.user = response.user
        this.token = response.token

        // Store in localStorage
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))

        return response
      } catch (err: any) {
        this.error = err.message || 'Failed to register'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Logout action
    logout() {
      this.user = null
      this.token = null

      // Remove from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

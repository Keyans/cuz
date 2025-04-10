import { defineStore } from 'pinia'

interface UserState {
  id: string
  nickname: string
  email: string
  phone: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    nickname: '',
    email: '',
    phone: '',
    avatar: ''
  }),

  actions: {
    updateUserInfo(userInfo: Partial<UserState>) {
      Object.assign(this, userInfo)
    },

    async fetchUserInfo() {
      try {
        // TODO: 替换为实际的API调用
        const response = await fetch('/api/user')
        const data = await response.json()
        this.updateUserInfo(data)
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    }
  }
}) 
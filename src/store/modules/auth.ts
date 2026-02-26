import { defineStore } from 'pinia'
import { userApi } from '@/api'
import { User } from '@/types'
import { STORAGE_KEYS } from '@/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem(STORAGE_KEYS.TOKEN) || '',
    isAuthenticated: false
  }),
  
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getUserRole: (state) => state.user?.role || 'employee',
    getUserDepartment: (state) => state.user?.department
  },
  
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await userApi.login(username, password)
        const { token, user } = response
        
        this.token = token
        this.user = user
        this.isAuthenticated = true
        
        // 保存到localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
        
        return user
      } catch (error) {
        throw error
      }
    },
    
    async logout() {
      try {
        // 清除本地状态
        this.user = null
        this.token = ''
        this.isAuthenticated = false
        
        // 清除localStorage
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        
        // 清除API token
        // axios默认会从localStorage读取，所以清除localStorage即可
      } catch (error) {
        throw error
      }
    },
    
    async fetchUserProfile() {
      try {
        const response = await userApi.getUserProfile()
        this.user = response.data
        this.isAuthenticated = true
        
        // 更新localStorage
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data))
        
        return response.data
      } catch (error) {
        throw error
      }
    },
    
    async updateUserProfile(data: Partial<User>) {
      try {
        const response = await userApi.updateUserProfile(data)
        this.user = response.data
        
        // 更新localStorage
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data))
        
        return response.data
      } catch (error) {
        throw error
      }
    },
    
    async changePassword(oldPassword: string, newPassword: string) {
      try {
        const response = await userApi.changePassword({ oldPassword, newPassword })
        return response
      } catch (error) {
        throw error
      }
    },
    
    // 从localStorage恢复登录状态
    restoreAuth() {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
      const userStr = localStorage.getItem(STORAGE_KEYS.USER)
      
      if (token && userStr) {
        this.token = token
        this.user = JSON.parse(userStr) as User
        this.isAuthenticated = true
      }
    }
  }
})

export default useAuthStore

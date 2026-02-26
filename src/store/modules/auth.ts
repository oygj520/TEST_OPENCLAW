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
    getUserDepartment: (state) => state.user?.department || ''
  },
  
  actions: {
    async login(username: string, password: string) {
      try {
        // 模拟 API 调用
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // 简单验证：admin/admin123
            if (username === 'admin' && password === 'admin123') {
              const user = {
                id: 'admin',
                username: 'admin',
                nickname: '管理员',
                email: 'admin@example.com',
                role: 'admin' as const,
                department: 'hr',
                phone: '13800138000',
                createdAt: new Date().toISOString()
              }
              
              const token = `token-${Date.now()}-${Math.random().toString(36).substring(2)}`
              
              this.token = token
              this.user = user
              this.isAuthenticated = true
            
              // 保存到localStorage
              localStorage.setItem(STORAGE_KEYS.TOKEN, token)
              localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
            
              resolve(user)
            } else {
              reject(new Error('用户名或密码错误'))
            }
          }, 500) // 模拟网络延迟
        })
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
        try {
          this.token = token
          this.user = JSON.parse(userStr) as User
          this.isAuthenticated = true
        } catch (e) {
          console.error('Failed to restore auth:', e)
        }
      }
    }
  }
})

export default useAuthStore

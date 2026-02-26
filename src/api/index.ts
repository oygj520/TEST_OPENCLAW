import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理错误
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        // Token过期或无效，清除token并跳转登录页
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// 认证API
export const authApi = {
  login: (data: { username: string; password: string }) => 
    instance.post('/auth/login', data),
  
  logout: () => 
    instance.post('/auth/logout'),
  
  refreshToken: (token: string) => 
    instance.post('/auth/refresh', { token })
}

// 员工管理API
export const employeeApi = {
  getEmployees: (params?: { department?: string; status?: string; page?: number; pageSize?: number }) => 
    instance.get('/employees', { params }),
  
  getEmployeeById: (id: string) => 
    instance.get(`/employees/${id}`),
  
  createEmployee: (data: any) => 
    instance.post('/employees', data),
  
  updateEmployee: (id: string, data: any) => 
    instance.put(`/employees/${id}`, data),
  
  deleteEmployee: (id: string) => 
    instance.delete(`/employees/${id}`)
}

// 员工管理API
export const userApi = {
  login: (data: { username: string; password: string }) => 
    instance.post('/auth/login', data),
  
  getUserProfile: () => 
    instance.get('/users/profile'),
  
  updateUserProfile: (data: any) => 
    instance.put('/users/profile', data),
  
  changePassword: (data: { oldPassword: string; newPassword: string }) => 
    instance.post('/users/change-password', data)
}

// 请假/加班API
export const leaveApi = {
  getLeaves: (params?: { status?: string; type?: string; page?: number; pageSize?: number }) => 
    instance.get('/leaves', { params }),
  
  getLeaveById: (id: string) => 
    instance.get(`/leaves/${id}`),
  
  createLeave: (data: any) => 
    instance.post('/leaves', data),
  
  updateLeave: (id: string, data: any) => 
    instance.put(`/leaves/${id}`, data),
  
  deleteLeave: (id: string) => 
    instance.delete(`/leaves/${id}`),
  
  approveLeave: (id: string, status: 'approved' | 'rejected') => 
    instance.patch(`/leaves/${id}/approve`, { status })
}

// 公告API
export const announcementApi = {
  getAnnouncements: (params?: { type?: string; priority?: string; page?: number; pageSize?: number }) => 
    instance.get('/announcements', { params }),
  
  getAnnouncementById: (id: string) => 
    instance.get(`/announcements/${id}`),
  
  createAnnouncement: (data: any) => 
    instance.post('/announcements', data),
  
  updateAnnouncement: (id: string, data: any) => 
    instance.put(`/announcements/${id}`, data),
  
  deleteAnnouncement: (id: string) => 
    instance.delete(`/announcements/${id}`)
}

export default instance

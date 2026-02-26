export interface User {
  id: string
  username: string
  nickname: string
  email: string
  avatar?: string
  role: 'admin' | 'employee' | 'manager'
  department?: string
  phone?: string
  createdAt?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface LeaveRequest {
  id?: string
  type: 'leave' | 'overtime' | 'business trip' | 'sick'
  startDate: string
  endDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt?: string
  APPROVED_BY?: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: 'notice' | 'announcement' | 'event'
  priority: 'low' | 'medium' | 'high'
  publishDate: string
  expirationDate?: string
  createdAt?: string
  creator?: User
}

export interface Employee {
  id: string
  username: string
  nickname: string
  email: string
  phone?: string
  department: string
  position: string
  status: 'active' | 'inactive' | 'on leave' | 'resigned'
  avatar?: string
  createdAt?: string
}

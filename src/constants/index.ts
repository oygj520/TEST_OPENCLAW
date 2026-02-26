import {_appConfig} from '../config'

export const SCREEN_SIZES = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440
}

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  CHINA_DATE: 'YYYY年MM月DD日',
  CHINA_DATETIME: 'YYYY年MM月DD日 HH:mm'
}

export const LEAVE_TYPES = [
  { value: 'leave', label: '事假', color: 'blue' },
  { value: 'overtime', label: '加班', color: 'green' },
  { value: 'business_trip', label: '出差', color: 'purple' },
  { value: 'sick', label: '病假', color: 'orange' },
  { value: 'annual', label: '年假', color: 'cyan' },
  { value: 'marriage', label: '婚假', color: 'pink' },
  { value: 'maternity', label: '产假', color: 'red' }
]

export const LEAVE_STATUSES = [
  { value: 'pending', label: '待处理', color: 'yellow' },
  { value: 'approved', label: '已批准', color: 'green' },
  { value: 'rejected', label: '已拒绝', color: 'red' }
]

export const ANNOUNCEMENT_TYPES = [
  { value: 'notice', label: '通知', icon: 'BellIcon' },
  { value: 'announcement', label: '公告', icon: 'SpeakerphoneIcon' },
  { value: 'event', label: '活动', icon: 'CalendarIcon' }
]

export const ANNOUNCEMENT_PRIORITIES = [
  { value: 'low', label: '低', color: 'gray' },
  { value: 'medium', label: '中', color: 'blue' },
  { value: 'high', label: '高', color: 'red' }
]

export const EMPLOYEE_STATUSES = [
  { value: 'active', label: '在职', color: 'green' },
  { value: 'inactive', label: '未激活', color: 'gray' },
  { value: 'on_leave', label: '请假中', color: 'yellow' },
  { value: 'resigned', label: '已离职', color: 'red' }
]

export const DEPARTMENTS = [
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'it', label: '信息技术部' },
  { value: 'sales', label: '销售部' },
  { value: 'marketing', label: '市场部' },
  { value: 'operations', label: '运营部' },
  { value: 'research', label: '研发部' },
  { value: 'support', label: '客服部' }
]

export const POSITIONS = [
  { value: 'intern', label: '实习生' },
  { value: 'assistant', label: '助理' },
  { value: 'employee', label: '员工' },
  { value: 'senior', label: '高级员工' },
  { value: 'team_leader', label: '团队负责人' },
  { value: 'manager', label: '经理' },
  { value: 'senior_manager', label: '高级经理' },
  { value: 'director', label: '总监' },
  { value: 'vp', label: '副总裁' },
  { value: 'ceo', label: 'CEO' }
]

export const PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'approve', 'manage_users'],
  manager: ['read', 'write', 'approve', 'manage_team'],
  employee: ['read', 'write']
}

export const ROLES = [
  { value: 'admin', label: '管理员', permissions: PERMISSIONS.admin },
  { value: 'manager', label: '经理', permissions: PERMISSIONS.manager },
  { value: 'employee', label: '普通员工', permissions: PERMISSIONS.employee }
]

export const CACHE_KEYS = {
  TOKEN: 'oa_token',
  USER: 'oa_user',
  THEME: 'oa_theme',
  LANGUAGE: 'oa_language'
}

export const STORAGE_KEYS = {
  TOKEN: 'oa_token',
  USER: 'oa_user',
  THEME: 'oa_theme',
  LAST_LOGIN: 'oa_last_login'
}

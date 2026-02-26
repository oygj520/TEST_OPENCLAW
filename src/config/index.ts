import { AppConfig } from '@/types'

export const APP_CONFIG: AppConfig = {
  name: '企业OA系统',
  version: '1.0.0',
  features: {
    authentication: true,
    employeeManagement: true,
    leaveManagement: true,
    announcement: true,
    dashboard: true,
    profile: true
  },
  limits: {
    maxUploadSize: 1024 * 1024 * 10, // 10MB
    maxEmployees: 1000,
    maxAnnouncements: 100
  }
}

export default {
  install(app) {
    app.config.globalProperties.$appConfig = APP_CONFIG
  }
}

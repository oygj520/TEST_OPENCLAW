import { App, ComponentInternalInstance } from 'vue'

/**
 * 工具函数集合
 */
export const Utils = {
  // 格式化日期
  formatDate(date: string | Date, format: string = 'YYYY-MM-DD'): string {
    if (!date) return ''
    
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  },
  
  // 深拷贝
  deepClone<T>(obj: T): T {
    if (!obj || typeof obj !== 'object') {
      return obj
    }
    
    const result = Array.isArray(obj) ? [] : {}
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = Utils.deepClone(obj[key])
      }
    }
    
    return result
  },
  
  // 防抖函数
  debounce(fn: Function, delay: number = 300): Function {
    let timer: number | null = null
    return function (...args: any[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  },
  
  // 节流函数
  throttle(fn: Function, delay: number = 300): Function {
    let lastTime = 0
    return function (...args: any[]) {
      const now = Date.now()
      if (now - lastTime >= delay) {
        fn.apply(this, args)
        lastTime = now
      }
    }
  },
  
  // 生成唯一ID
  generateId(prefix: string = ''): string {
    return `${prefix}${Date.now()}${Math.random().toString(36).substring(2, 15)}`
  },
  
  // 判断是否为空
  isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
  },
  
  // 格式化文件大小
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },
  
  // 随机颜色
  getRandomColor(): string {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  },
  
  // 处理API错误
  handleApiError(error: any): string {
    if (error.response) {
      return error.response.data?.message || '请求失败'
    } else if (error.request) {
      return '网络错误，请检查网络连接'
    } else {
      return error.message || '未知错误'
    }
  }
}

/**
 * 安装工具函数到Vue实例
 */
export const installUtils = (app: App) => {
  app.config.globalProperties.$utils = Utils
}

export default Utils

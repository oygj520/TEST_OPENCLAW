import { defineStore } from 'pinia'

export interface AnnouncementState {
  announcements: Array<{
    id: string
    title: string
    content: string
    type: 'notice' | 'announcement' | 'event'
    priority: 'low' | 'medium' | 'high'
    publishDate: string
    createdAt?: string
  }>
  total: number
  loading: boolean
  filters: {
    type: string
    priority: string
    search: string
  }
}

export const useAnnouncementStore = defineStore('announcement', {
  state: (): AnnouncementState => ({
    announcements: [],
    total: 0,
    loading: false,
    filters: {
      type: '',
      priority: '',
      search: ''
    }
  }),
  
  getters: {
    getAnnouncements: (state) => state.announcements,
    getTotal: (state) => state.total,
    getFilters: (state) => state.filters
  },
  
  actions: {
    async fetchAnnouncements(params?: { 
      type?: string; 
      priority?: string; 
      search?: string;
      page?: number; 
      pageSize?: number 
    }) {
      this.loading = true
      try {
        // 模拟数据
        const mockData = [
          { 
            id: '1', 
            title: '关于系统升级的通知', 
            content: '系统将于本周六进行升级维护，预计需要4小时。',
            type: 'notice', 
            priority: 'high', 
            publishDate: '2024-02-20' 
          },
          { 
            id: '2', 
            title: '周末团建活动', 
            content: '本周六下午组织部门团建活动，地点在XX公园。',
            type: 'event', 
            priority: 'medium', 
            publishDate: '2024-02-18' 
          }
        ]
        
        this.announcements = mockData
        this.total = mockData.length
        
        return mockData
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    addAnnouncement(announcement: any) {
      this.announcements.push(announcement)
      this.total++
    },
    
    updateAnnouncement(id: string, data: any) {
      const index = this.announcements.findIndex(a => a.id === id)
      if (index !== -1) {
        this.announcements[index] = { ...this.announcements[index], ...data }
      }
    },
    
    deleteAnnouncement(id: string) {
      const index = this.announcements.findIndex(a => a.id === id)
      if (index !== -1) {
        this.announcements.splice(index, 1)
        this.total--
      }
    }
  }
})

export default useAnnouncementStore
export const announcementStore = useAnnouncementStore()

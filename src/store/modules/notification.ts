import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Array<{
      id: string
      title: string
      message: string
      type: 'success' | 'error' | 'warning' | 'info'
      timestamp: number
      read: boolean
    }>,
    unreadCount: 0
  }),
  
  getters: {
    getNotifications: (state) => state.notifications,
    getUnreadCount: (state) => state.unreadCount,
    getRecentNotifications: (state) => state.notifications.slice(0, 5)
  },
  
  actions: {
    addNotification(notification: Omit<typeof state.notifications[0], 'id' | 'timestamp' | 'read'>) {
      const notificationWithId = {
        ...notification,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false
      }
      
      this.notifications.unshift(notificationWithId)
      this.unreadCount++
    },
    
    markAsRead(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notifications[index].read = true
        this.unreadCount--
      }
    },
    
    markAllAsRead() {
      this.notifications.forEach(n => {
        if (!n.read) {
          n.read = true
          this.unreadCount--
        }
      })
    },
    
    deleteNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    }
  }
})

export default useNotificationStore

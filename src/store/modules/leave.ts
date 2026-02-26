import { defineStore } from 'pinia'
import { LeaveRequest } from '@/types'

export const useLeaveStore = defineStore('leave', {
  state: () => ({
    leaves: [] as LeaveRequest[],
    total: 0,
    loading: false,
    filters: {
      status: '',
      type: '',
      search: ''
    }
  }),
  
  getters: {
    getLeaves: (state) => state.leaves,
    getTotal: (state) => state.total,
    getFilters: (state) => state.filters
  },
  
  actions: {
    async fetchLeaves(params?: { 
      status?: string; 
      type?: string; 
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
            type: 'leave', 
            startDate: '2024-03-01', 
            endDate: '2024-03-03', 
            reason: '家里有事需要处理',
            status: 'approved' 
          },
          { 
            id: '2', 
            type: 'overtime', 
            startDate: '2024-03-05', 
            endDate: '2024-03-05', 
            reason: '项目紧急需求加班',
            status: 'pending' 
          }
        ]
        
        this.leaves = mockData
        this.total = mockData.length
        
        return mockData
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async createLeave(leaveData: Omit<LeaveRequest, 'id' | 'status' | 'createdAt'>) {
      const newLeave: LeaveRequest = {
        ...leaveData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      this.leaves.push(newLeave)
      this.total++
      return newLeave
    },
    
    async approveLeave(id: string, status: 'approved' | 'rejected') {
      const index = this.leaves.findIndex(l => l.id === id)
      if (index !== -1) {
        this.leaves[index].status = status
      }
    },
    
    deleteLeave(id: string) {
      const index = this.leaves.findIndex(l => l.id === id)
      if (index !== -1) {
        this.leaves.splice(index, 1)
        this.total--
      }
    }
  }
})

export default useLeaveStore
export const leaveStore = useLeaveStore()

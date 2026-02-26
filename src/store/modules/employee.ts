import { defineStore } from 'pinia'
import { Employee } from '@/types'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    total: 0,
    loading: false,
    filters: {
      department: '',
      status: '',
      search: ''
    }
  }),
  
  getters: {
    getEmployees: (state) => state.employees,
    getTotal: (state) => state.total,
    getFilters: (state) => state.filters
  },
  
  actions: {
    async fetchEmployees(params?: { 
      department?: string; 
      status?: string; 
      search?: string;
      page?: number; 
      pageSize?: number 
    }) {
      this.loading = true
      try {
        // TODO: 实际实现时调用API
        // const response = await employeeApi.getEmployees(params)
        // this.employees = response.data.list
        // this.total = response.data.total
        
        // 模拟数据
        const mockData = [
          { id: '1', username: 'admin', nickname: '管理员', email: 'admin@example.com', department: 'hr', position: 'ceo', status: 'active' },
          { id: '2', username: 'zhangsan', nickname: '张三', email: 'zhangsan@example.com', department: 'it', position: 'manager', status: 'active' },
          { id: '3', username: 'lisi', nickname: '李四', email: 'lisi@example.com', department: 'sales', position: 'employee', status: 'active' }
        ]
        
        this.employees = mockData
        this.total = mockData.length
        
        return mockData
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    addEmployee(employee: Employee) {
      this.employees.push(employee)
      this.total++
    },
    
    updateEmployee(id: string, data: Partial<Employee>) {
      const index = this.employees.findIndex(e => e.id === id)
      if (index !== -1) {
        this.employees[index] = { ...this.employees[index], ...data }
      }
    },
    
    deleteEmployee(id: string) {
      const index = this.employees.findIndex(e => e.id === id)
      if (index !== -1) {
        this.employees.splice(index, 1)
        this.total--
      }
    }
  }
})

export default useEmployeeStore

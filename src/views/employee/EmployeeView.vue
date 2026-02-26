<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">员工管理</h2>
      <button 
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加员工
      </button>
    </div>
    
    <!-- Filter -->
    <div class="bg-white p-4 rounded-xl shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">部门</label>
          <select v-model="filters.department" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">全部部门</option>
            <option v-for="dept in departments" :key="dept.value" :value="dept.value">{{ dept.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
          <select v-model="filters.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">全部状态</option>
            <option v-for="status in employeeStatuses" :key="status.value" :value="status.value">{{ status.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">搜索</label>
          <input 
            v-model="filters.search" 
            type="text" 
            placeholder="用户名/邮箱/姓名"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div class="flex items-end">
          <button @click="fetchEmployees" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            查询
          </button>
        </div>
      </div>
    </div>
    
    <!-- Employee List -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">员工</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">部门</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">职位</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {{ employee.nickname?.[0] || employee.username?.[0] }}
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ employee.nickname || employee.username }}</div>
                  <div class="text-sm text-gray-500">{{ employee.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ getDepartmentName(employee.department) }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ employee.position }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getStatusColor(employee.status)"
              >
                {{ employee.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end space-x-2">
                <button class="text-blue-600 hover:text-blue-900">编辑</button>
                <button class="text-red-600 hover:text-red-900">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div class="flex justify-center space-x-2">
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="currentPage = page"
        class="px-4 py-2 rounded-lg"
        :class="{ 'bg-blue-600 text-white': currentPage === page }"
      >
        {{ page }}
      </button>
    </div>
    
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">添加员工</h3>
        <form @submit.prevent="addEmployee">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <input v-model="newEmployee.username" class="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input v-model="newEmployee.email" type="email" class="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">部门</label>
              <select v-model="newEmployee.department" class="w-full px-3 py-2 border rounded-lg">
                <option v-for="dept in departments" :key="dept.value" :value="dept.value">{{ dept.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">职位</label>
              <select v-model="newEmployee.position" class="w-full px-3 py-2 border rounded-lg">
                <option v-for="pos in positions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">取消</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { employeeApi } from '@/store/modules/employee'
import { useEmployeeStore } from '@/store/modules/employee'
import { DEPARTMENTS, POSITIONS, EMPLOYEE_STATUSES } from '@/constants'

const showAddModal = ref(false)
const filters = ref({
  department: '',
  status: '',
  search: ''
})

const departments = DEPARTMENTS
const positions = POSITIONS
const employeeStatuses = EMPLOYEE_STATUSES

const employeeStore = useEmployeeStore()

const newEmployee = ref({
  username: '',
  nickname: '',
  email: '',
  department: '',
  position: '',
  status: 'active'
})

const employees = computed(() => employeeStore.getEmployees)
const totalPages = computed(() => Math.ceil(employeeStore.total / 10))
const currentPage = ref(1)

const getDepartmentName = (dept: string) => {
  const department = departments.find(d => d.value === dept)
  return department?.label || dept
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    on_leave: 'bg-yellow-100 text-yellow-800',
    resigned: 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const fetchEmployees = async () => {
  await employeeStore.fetchEmployees({
    ...filters.value,
    page: currentPage.value,
    pageSize: 10
  })
}

const addEmployee = () => {
  employeeStore.addEmployee({
    ...newEmployee.value,
    id: Date.now().toString()
  })
  showAddModal.value = false
  newEmployee.value = { username: '', nickname: '', email: '', department: '', position: '', status: 'active' }
}

onMounted(() => {
  fetchEmployees()
})
</script>

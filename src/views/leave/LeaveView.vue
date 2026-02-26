<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">请假/加班申请</h2>
      <button 
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        申请请假/加班
      </button>
    </div>
    
    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">类型</label>
          <select v-model="filters.type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">全部类型</option>
            <option v-for="leave in leaveTypes" :key="leave.value" :value="leave.value">{{ leave.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
          <select v-model="filters.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">全部状态</option>
            <option v-for="status in leaveStatuses" :key="status.value" :value="status.value">{{ status.label }}</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="fetchLeaves" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            查询
          </button>
        </div>
      </div>
    </div>
    
    <!-- Leave List -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">原因</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="leave in leaves" :key="leave.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <span 
                class="px-3 py-1 text-sm font-medium rounded-full"
                :class="getLeaveTypeColor(leave.type)"
              >
                {{ getLeaveTypeName(leave.type) }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ formatDate(leave.startDate) }} - {{ formatDate(leave.endDate) }}
              <div class="text-xs text-gray-400 mt-1">
                共 {{ getLeaveDays(leave.startDate, leave.endDate) }} 天
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ leave.reason }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getLeaveStatusColor(leave.status)"
              >
                {{ getLeaveStatusName(leave.status) }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end space-x-2">
                <button 
                  v-if="leave.status === 'pending'"
                  @click="approveLeave(leave.id, 'approved')"
                  class="text-green-600 hover:text-green-900"
                >
                  批准
                </button>
                <button 
                  v-if="leave.status === 'pending'"
                  @click="approveLeave(leave.id, 'rejected')"
                  class="text-red-600 hover:text-red-900"
                >
                  拒绝
                </button>
                <button class="text-blue-600 hover:text-blue-900">详情</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Add Leave Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">申请请假/加班</h3>
        <form @submit.prevent="addLeave">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">类型</label>
              <select v-model="newLeave.type" class="w-full px-3 py-2 border rounded-lg">
                <option v-for="leave in leaveTypes" :key="leave.value" :value="leave.value">{{ leave.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
              <input v-model="newLeave.startDate" type="date" class="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
              <input v-model="newLeave.endDate" type="date" class="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">原因</label>
              <textarea v-model="newLeave.reason" class="w-full px-3 py-2 border rounded-lg" rows="3" required></textarea>
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-6">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">取消</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">提交申请</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { leaveApi } from '@/store/modules/leave'
import { useLeaveStore } from '@/store/modules/leave'
import { LEAVE_TYPES, LEAVE_STATUSES } from '@/constants'

const showAddModal = ref(false)
const filters = ref({
  type: '',
  status: ''
})

const leaveTypes = LEAVE_TYPES
const leaveStatuses = LEAVE_STATUSES

const leaveStore = useLeaveStore()

const newLeave = ref({
  type: 'leave',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  reason: ''
})

const leaves = computed(() => leaveStore.leaves)

const getLeaveTypeName = (type: string) => {
  const leave = leaveTypes.find(l => l.value === type)
  return leave?.label || type
}

const getLeaveTypeColor = (type: string) => {
  const leave = leaveTypes.find(l => l.value === type)
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
    cyan: 'bg-cyan-100 text-cyan-800',
    pink: 'bg-pink-100 text-pink-800',
    red: 'bg-red-100 text-red-800'
  }
  return colors[leave?.color || 'gray'] || 'bg-gray-100 text-gray-800'
}

const getLeaveStatusName = (status: string) => {
  const statusObj = leaveStatuses.find(s => s.value === status)
  return statusObj?.label || status
}

const getLeaveStatusColor = (status: string) => {
  const statusObj = leaveStatuses.find(s => s.value === status)
  const colors: Record<string, string> = {
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800'
  }
  return colors[statusObj?.color || 'gray'] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: string) => {
  return date.split('T')[0]
}

const getLeaveDays = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1
}

const fetchLeaves = async () => {
  await leaveStore.fetchLeaves({
    ...filters.value,
    page: 1,
    pageSize: 10
  })
}

const addLeave = () => {
  leaveStore.createLeave({
    ...newLeave.value,
    status: 'pending',
    createdAt: new Date().toISOString()
  })
  showAddModal.value = false
  newLeave.value = { type: 'leave', startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0], reason: '' }
}

const approveLeave = async (id: string, status: 'approved' | 'rejected') => {
  await leaveStore.approveLeave(id, status)
}

onMounted(() => {
  fetchLeaves()
})
</script>

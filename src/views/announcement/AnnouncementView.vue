<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">公告管理</h2>
      <button 
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加公告
      </button>
    </div>
    
    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">类型</label>
          <select v-model="filters.type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">全部类型</option>
            <option v-for="type in announcementTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">优先级</label>
          <select v-model="filters.priority" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">全部优先级</option>
            <option v-for="priority in announcementPriorities" :key="priority.value" :value="priority.value">{{ priority.label }}</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="fetchAnnouncements" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            查询
          </button>
        </div>
      </div>
    </div>
    
    <!-- Announcement List -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">优先级</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">发布时间</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="announcement in announcements" :key="announcement.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-gray-900">{{ announcement.title }}</div>
              <div class="text-xs text-gray-500 mt-1 line-clamp-2">{{ announcement.content }}</div>
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
              >
                {{ getAnnouncementTypeName(announcement.type) }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getAnnouncementPriorityColor(announcement.priority)"
              >
                {{ getAnnouncementPriorityName(announcement.priority) }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(announcement.publishDate) }}</td>
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
    
    <!-- Add Announcement Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-xl w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">添加公告</h3>
        <form @submit.prevent="addAnnouncement">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">标题</label>
              <input v-model="newAnnouncement.title" class="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">类型</label>
              <select v-model="newAnnouncement.type" class="w-full px-3 py-2 border rounded-lg">
                <option v-for="type in announcementTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">优先级</label>
              <select v-model="newAnnouncement.priority" class="w-full px-3 py-2 border rounded-lg">
                <option v-for="priority in announcementPriorities" :key="priority.value" :value="priority.value">{{ priority.label }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">内容</label>
              <textarea v-model="newAnnouncement.content" class="w-full px-3 py-2 border rounded-lg" rows="5" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">发布时间</label>
              <input v-model="newAnnouncement.publishDate" type="datetime-local" class="w-full px-3 py-2 border rounded-lg" required />
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
import { announcementApi } from '@/store/modules/announcement'
import { useAnnouncementStore } from '@/store/modules/announcement'
import { ANNOUNCEMENT_TYPES, ANNOUNCEMENT_PRIORITIES } from '@/constants'

const showAddModal = ref(false)
const filters = ref({
  type: '',
  priority: ''
})

const announcementTypes = ANNOUNCEMENT_TYPES
const announcementPriorities = ANNOUNCEMENT_PRIORITIES

const announcementStore = useAnnouncementStore()

const newAnnouncement = ref({
  title: '',
  type: 'notice',
  content: '',
  priority: 'medium',
  publishDate: new Date().toISOString().slice(0, 16)
})

const announcements = computed(() => announcementStore.announcements)

const getAnnouncementTypeName = (type: string) => {
  const typeObj = announcementTypes.find(t => t.value === type)
  return typeObj?.label || type
}

const getAnnouncementPriorityName = (priority: string) => {
  const priorityObj = announcementPriorities.find(p => p.value === priority)
  return priorityObj?.label || priority
}

const getAnnouncementPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: string) => {
  return date.replace('T', ' ')
}

const fetchAnnouncements = async () => {
  await announcementStore.fetchAnnouncements({
    ...filters.value,
    page: 1,
    pageSize: 10
  })
}

const addAnnouncement = () => {
  announcementStore.addAnnouncement({
    ...newAnnouncement.value,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  })
  showAddModal.value = false
  newAnnouncement.value = { title: '', type: 'notice', content: '', priority: 'medium', publishDate: new Date().toISOString().slice(0, 16) }
}

onMounted(() => {
  fetchAnnouncements()
})
</script>

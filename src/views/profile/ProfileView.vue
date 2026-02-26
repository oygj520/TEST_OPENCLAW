<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">个人中心</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Profile Info -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-xl shadow-sm p-6 text-center">
          <div class="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
            {{ user?.nickname?.[0] || user?.username?.[0] || 'U' }}
          </div>
          <h3 class="mt-4 text-xl font-semibold text-gray-900">{{ user?.nickname || user?.username }}</h3>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
          
          <div class="mt-6 space-y-2 text-left">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10a4 4 0 118 0 4 4 0 01-8 0" />
              </svg>
              <span class="text-sm text-gray-600">职位: {{ user?.position }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span class="text-sm text-gray-600">部门: {{ user?.department }}</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-gray-600">加入时间: {{ formatDate(user?.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Profile Form -->
      <div class="md:col-span-2">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-6">个人信息</h3>
          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input v-model="profile.username" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">昵称</label>
                <input v-model="profile.nickname" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input v-model="profile.email" type="email" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input v-model="profile.phone" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">部门</label>
                <select v-model="profile.department" class="w-full px-3 py-2 border rounded-lg">
                  <option v-for="dept in departments" :key="dept.value" :value="dept.value">{{ dept.label }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">职位</label>
                <select v-model="profile.position" class="w-full px-3 py-2 border rounded-lg">
                  <option v-for="pos in positions" :key="pos.value" :value="pos.value">{{ pos.label }}</option>
                </select>
              </div>
            </div>
            <div class="mt-6">
              <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                保存修改
              </button>
            </div>
          </form>
        </div>
        
        <!-- Security Settings -->
        <div class="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-6">安全设置</h3>
          <form @submit.prevent="changePassword">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">原密码</label>
                <input v-model="passwordForm.oldPassword" type="password" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">新密码</label>
                <input v-model="passwordForm.newPassword" type="password" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
                <input v-model="passwordForm.confirmPassword" type="password" class="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
            <div class="mt-6">
              <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                修改密码
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { DEPARTMENTS, POSITIONS } from '@/constants'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

const profile = ref({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  department: '',
  position: ''
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const departments = DEPARTMENTS
const positions = POSITIONS

const formatDate = (date: string) => {
  if (!date) return '-'
  return date.split('T')[0]
}

const updateProfile = async () => {
  try {
    await authStore.updateUserProfile(profile.value)
    alert('个人信息更新成功')
  } catch (error) {
    alert('更新失败')
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  try {
    await authStore.changePassword(passwordForm.value.oldPassword, passwordForm.value.newPassword)
    alert('密码修改成功')
    passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  } catch (error) {
    alert('修改失败')
  }
}

onMounted(() => {
  profile.value = {
    username: user.value?.username || '',
    nickname: user.value?.nickname || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    department: user.value?.department || '',
    position: user.value?.position || ''
  }
})
</script>

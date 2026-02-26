import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout/LayoutView.vue'
import LoginView from '../views/auth/LoginView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import EmployeeView from '../views/employee/EmployeeView.vue'
import LeaveView from '../views/leave/LeaveView.vue'
import AnnouncementView from '../views/announcement/AnnouncementView.vue'
import ProfileView from '../views/profile/ProfileView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardView,
        meta: { title: '仪表盘' }
      },
      {
        path: 'employees',
        name: 'Employee',
        component: EmployeeView,
        meta: { title: '员工管理' }
      },
      {
        path: 'leave',
        name: 'Leave',
        component: LeaveView,
        meta: { title: '请假/加班' }
      },
      {
        path: 'announcements',
        name: 'Announcement',
        component: AnnouncementView,
        meta: { title: '公告管理' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView,
        meta: { title: '个人中心' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫 - 检查是否需要登录
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router

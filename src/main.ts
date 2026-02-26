import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import NaiveUI from 'naive-ui'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import routes from './router'
import './styles/main.css'

/**
 * 创建Vue应用实例
 */
const app = createApp(App)

/**
 * 创建状态管理
 */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * 使用插件
 */
app.use(pinia)
app.use(router)
app.use(NaiveUI)

/**
 * 挂载应用
 */
app.mount('#app')

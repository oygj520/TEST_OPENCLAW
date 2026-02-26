import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import NaiveUI from 'naive-ui'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import App from './App.vue'
import router from './router'
import './styles/main.css'

/**
 * 创建Vue应用实例
 */
const app = createApp(App)

/**
 * 创建状态管理
 */
const pinia = createPinia()
console.log('Pinia created:', pinia)
pinia.use(piniaPluginPersistedstate)

/**
 * 创建路由
 * 使用从 router/index.ts 导入的 router 实例
 */

/**
 * 使用插件
 */
app.use(pinia)
console.log('Pinia registered with app')
app.use(router)
console.log('Router registered with app')
app.use(NaiveUI)

/**
 * 挂载应用
 */
app.mount('#app')
console.log('App mounted')

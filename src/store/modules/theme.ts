import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('oa_theme') || 'light',
    isSidebarCollapsed: false
  }),
  
  getters: {
    getTheme: (state) => state.theme,
    isDarkMode: (state) => state.theme === 'dark',
    getSidebarState: (state) => state.isSidebarCollapsed
  },
  
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('oa_theme', this.theme)
    },
    
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      localStorage.setItem('oa_theme', theme)
    },
    
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    },
    
    setSidebarState(state: boolean) {
      this.isSidebarCollapsed = state
    }
  }
})

export default useThemeStore

import { createSSRApp } from 'vue'
import App from './App.vue'
import './static/tailwind.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
} 
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())

  // La sesión se carga ANTES de activar el router,
  // para que la guardia de rutas ya sepa si hay usuario
  const auth = useAuthStore()
  await auth.init()

  app.use(router)
  app.mount('#app')
}

bootstrap()

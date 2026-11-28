<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function handleSignOut() {
  await auth.signOut()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white p-6">
    <header class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <div class="flex items-center gap-4">
        <span class="text-sm text-slate-400">{{ auth.user?.email }}</span>
        <button
          class="rounded-lg bg-slate-700 hover:bg-slate-600 px-3 py-1.5 text-sm"
          @click="handleSignOut"
        >
          Salir
        </button>
      </div>
    </header>

    <p class="text-slate-300">Aquí irán tus estadísticas y trades 📈</p>
  </div>
</template>

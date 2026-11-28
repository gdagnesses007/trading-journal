<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isRegister = ref(false)
const submitting = ref(false)
const info = ref<string | null>(null)

async function handleSubmit() {
  info.value = null
  submitting.value = true

  const ok = isRegister.value
    ? await auth.signUp(email.value, password.value)
    : await auth.signIn(email.value, password.value)

  submitting.value = false

  if (!ok) return

  if (auth.isAuthenticated) {
    router.push({ name: 'dashboard' })
  } else {
    // Pasa cuando "Confirm email" está activado en Supabase
    info.value = 'Cuenta creada. Revisa tu correo para confirmarla.'
  }
}

function toggleMode() {
  isRegister.value = !isRegister.value
  auth.error = null
  info.value = null
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-slate-800 rounded-xl p-6 shadow-lg">
      <h1 class="text-2xl font-bold text-white mb-1">Trading Journal</h1>
      <p class="text-slate-400 mb-6">
        {{ isRegister ? 'Crea tu cuenta' : 'Inicia sesión' }}
      </p>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm text-slate-300 mb-1">Correo</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-lg bg-slate-700 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm text-slate-300 mb-1">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="6"
            :autocomplete="isRegister ? 'new-password' : 'current-password'"
            class="w-full rounded-lg bg-slate-700 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <p v-if="auth.error" class="text-sm text-red-400">{{ auth.error }}</p>
        <p v-if="info" class="text-sm text-emerald-400">{{ info }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2 transition"
        >
          {{ submitting ? 'Procesando...' : isRegister ? 'Registrarme' : 'Entrar' }}
        </button>
      </form>

      <button
        type="button"
        class="mt-4 text-sm text-slate-400 hover:text-white"
        @click="toggleMode"
      >
        {{ isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}
      </button>
    </div>
  </div>
</template>

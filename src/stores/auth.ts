import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)

  // Acciones
  async function init() {
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user ?? null
    loading.value = false

    // Mantiene el estado sincronizado (login, logout, token renovado)
    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })
  }

  async function signUp(email: string, password: string) {
    error.value = null
    const { error: err } = await supabase.auth.signUp({ email, password })
    if (err) {
      error.value = err.message
      return false
    }
    return true
  }

  async function signIn(email: string, password: string) {
    error.value = null
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      error.value = err.message
      return false
    }
    return true
  }

  async function signOut() {
    error.value = null
    const { error: err } = await supabase.auth.signOut()
    if (err) error.value = err.message
  }

  return { user, session, loading, error, isAuthenticated, init, signUp, signIn, signOut }
})

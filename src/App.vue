<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

onMounted(async () => {
  const { data, error } = await supabase.from('trades').select('*').limit(1)
  console.log('data:', data)
  console.log('error:', error)
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white flex items-center justify-center">
    <h1 class="text-3xl font-bold">Trading Journal 🚀</h1>
  </div>
</template>

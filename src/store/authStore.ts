import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Nullable } from '@hn/types'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<Nullable<string>>(null)

  const setToken = (value: Nullable<string>) => {
    token.value = value
  }

  return {
    token,
    setToken
  }
})

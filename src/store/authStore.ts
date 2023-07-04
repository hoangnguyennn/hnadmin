import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<Types.Nullable<string>>(null)

  const setToken = (value: Types.Nullable<string>) => {
    token.value = value
  }

  return {
    token,
    setToken
  }
})

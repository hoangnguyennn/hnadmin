import GenerateUtil from '@hn/utils/generate.util'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('appStore', () => {
  const isLoading = ref(false)
  const language = ref('en')
  const snackbars = ref<Types.ISnackbar[]>([])

  const setIsLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setLanguage = (value: string) => {
    language.value = value
  }

  const addSnackbar = (snackbar: Types.ISnackbarOption | string) => {
    if (typeof snackbar === 'object') {
      const newSnackbar: Types.ISnackbar = {
        ...snackbar,
        id: GenerateUtil.generateId()
      }

      snackbars.value.push(newSnackbar)
    } else {
      const newSnackbar: Types.ISnackbar = {
        id: GenerateUtil.generateId(),
        message: snackbar
      }

      snackbars.value.push(newSnackbar)
    }
  }

  const removeSnackbar = (id: string) => {
    snackbars.value = snackbars.value.filter(snackbar => snackbar.id !== id)
  }

  return {
    isLoading,
    language,
    setIsLoading,
    setLanguage,
    addSnackbar,
    removeSnackbar
  }
})

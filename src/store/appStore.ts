import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ISnackbar, ISnackbarOption } from '@hn/types/store'
import GenerateUtil from '@hn/utils/generate.util'

export const useAppStore = defineStore('appStore', () => {
  const isLoading = ref(false)
  const language = ref('en')
  const snackbars = ref<ISnackbar[]>([])

  const setIsLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setLanguage = (value: string) => {
    language.value = value
  }

  const addSnackbar = (snackbar: ISnackbarOption | string) => {
    if (typeof snackbar === 'object') {
      const newSnackbar: ISnackbar = {
        ...snackbar,
        id: GenerateUtil.generateId()
      }

      snackbars.value.push(newSnackbar)
    } else {
      const newSnackbar: ISnackbar = {
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

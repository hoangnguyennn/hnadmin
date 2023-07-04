import axios, { AxiosError, AxiosResponse } from 'axios'
import { API_BASE_URL } from '@hn/constants'
import { BAD_REQUEST_MESSAGE, OFFLINE_MESSAGE } from './apiErrors'
import { useAuthStore } from '@hn/store/authStore'
import ApiUtil from '@hn/utils/api.util'
import { ElNotification } from 'element-plus'

const apiClient = axios.create({
  baseURL: API_BASE_URL
})

apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore()
  const token = authStore.token

  config.headers.Authorization = `Bearer ${token}`

  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    if (!error.response) {
      console.log(OFFLINE_MESSAGE)
      return
    }

    const response = error.response as AxiosResponse
    const reason = response.data.reason

    const errorMessage = ApiUtil.getErrorMessage(reason, BAD_REQUEST_MESSAGE)

    ElNotification({
      message: errorMessage,
      position: 'bottom-left'
    })
  }
)

export default apiClient

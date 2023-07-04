<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@hn/store/appStore'
import { ElNotification } from 'element-plus'
import exampleImage from '@hn/assets/images/example.png'

const appStore = useAppStore()
const { language } = storeToRefs(appStore)
const { locale, t } = useI18n()

const changeLanguage = () => {
  if (language.value === 'en') {
    locale.value = 'vi'
    appStore.setLanguage('vi')
  } else {
    locale.value = 'en'
    appStore.setLanguage('en')
  }
}

const showNotification = () => {
  ElNotification({
    type: 'error',
    message: 'hello',
    position: 'bottom-left'
  })
}
</script>

<template>
  <div>
    <h2>HomePage</h2>
    <p>Current language: {{ language }}</p>
    <button @click="changeLanguage">Change language</button>

    <p>{{ t('hello') }}</p>

    <el-button type="primary" @click="showNotification">
      Show notification
    </el-button>

    <img :src="exampleImage" />
  </div>
</template>

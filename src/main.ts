import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@hn/assets/styles/main.scss'

import App from './App.vue'
import i18n from './locales'
import router from './router'
import pinia from './store'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app')

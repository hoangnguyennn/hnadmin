import { createI18n } from 'vue-i18n'

import vi from './lang/vi.json'
import en from './lang/en.json'

const messages = { vi, en }

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export default i18n

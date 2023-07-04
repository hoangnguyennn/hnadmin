import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@hn/layouts/DefaultLayout.vue'
import BlankLayout from '@hn/layouts/BlankLayout.vue'

import HomePage from '@hn/pages/HomePage.vue'
import AboutPage from '@hn/pages/AboutPage.vue'
import ContactPage from '@hn/pages/ContactPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/about',
    component: AboutPage,
    meta: {
      layout: BlankLayout
    }
  },
  {
    path: '/contact',
    component: ContactPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

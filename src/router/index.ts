import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@hn/layouts/DefaultLayout.vue'

import HomePage from '@hn/pages/HomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    meta: {
      layout: DefaultLayout
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

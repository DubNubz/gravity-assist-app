import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/modules/color-generator',
      name: 'color-generator',
      component: () => import('../views/ColorView.vue')
    },
    {
      path: '/modules/research-agreement-helper',
      name: 'research-agreement-helper',
      component: () => import('../views/ResearchView.vue')
    },
    {
      path: '/modules/module-library',
      name: 'module-library',
      component: () => import('../views/LibraryView.vue')
    }
  ]
})

export default router
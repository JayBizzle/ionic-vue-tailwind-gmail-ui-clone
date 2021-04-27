import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Inbox from '../views/Inbox.vue'
import Email from '../views/Email.vue'
import Compose from '../views/Compose.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/inbox'
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: Inbox
  },
  {
    path: '/email/:id',
    name: 'Email',
    component: Email
  },
  {
    path: '/compose',
    name: 'Compose',
    component: Compose
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

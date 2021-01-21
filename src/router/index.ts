import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Create from '../views/Create.vue'
import Player from '../views/Player.vue'
import Quests from '../views/Quests.vue'
import Tasks from '../views/Tasks.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/quests',
    name: 'Quests',
    component: Quests
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Create from '../views/Create.vue'
import Player from '../views/Player.vue'
import Quests from '../views/Quests.vue'
import Tasks from '../views/Tasks.vue'
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import firebase from 'firebase';

import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/player',
    name: 'Player',
    component: Player,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quests',
    name: 'Quests',
    component: Quests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {
      hideForAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


const authUser = () => {
  return new Promise((resolve, reject) => {
    if (store.state.user.loggedIn === null) {
      const unwatch = store.watch(
        () => store.state.user.loggedIn,
        (value) => {
          unwatch()
          resolve(value)
        }
      )
    } else {
      resolve(store.state.user.loggedIn)
    }
  })
}

router.beforeEach(async (to, from, next) => {
  const loggedIn = await authUser();
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ path: '/login' });
    console.log("Here1");
  } 
  else if (to.matched.some(record => record.meta.hideForAuth) && loggedIn) {
    next({ path: '/dashboard' });
    console.log("Here2");
  } 
  else {
    next();
    console.log("Here3");
  }
});

export default router

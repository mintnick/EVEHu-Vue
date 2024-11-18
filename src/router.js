import { createWebHistory, createRouter } from "vue-router";

import Home from './components/Home.vue'
import Alliance from './components/Alliance.vue'
import Corporation from './components/Corporation.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/alliance/:id', component: Alliance },
  { path: '/corporation/:id', component: Corporation },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
import { createRouter, createWebHistory } from "vue-router";

import Servers from "./components/Servers.vue";
import Home from "./components/Home.vue";
import Alliance from "./components/Alliance.vue";
import Corporation from "./components/Corporation.vue";

const routes = [
  { path: "/", component: Servers },
  { path: "/:server", component: Home },
  { path: "/:server/alliance/:id", component: Alliance },
  { path: "/:server/corporation/:id", component: Corporation },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

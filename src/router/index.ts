import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useUserStore } from '../stores/user';

const checkAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore();

  if (!userStore.userId) {
    next({ name: 'Auth' });
  } else {
    next();
  }
};

const routs: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/PageHome.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/PageTaskList.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/task/:id',
    name: 'SingleTask',
    component: () => import('../views/PageTask.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/stat',
    name: 'Statistics',
    component: () => import('../views/PageStatistics.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/PageAuth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routs,
});

export default router;

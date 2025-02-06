import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const checkAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  let isAuth = false;
  onAuthStateChanged(getAuth(), user => {
    if (user && !isAuth) {
      isAuth = true;
      next();
    } else if (!user && !isAuth) {
      isAuth = true;
      next('/auth');
    }
  });
};

const routs: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/PageHome.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/PageTaskList.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/list/:id',
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

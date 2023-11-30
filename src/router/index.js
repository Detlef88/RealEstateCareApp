import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginPage from '@/views/LoginPage.vue';
import AuthenticationPage from '@/views/AuthenticationPage.vue';
import TabsPage from '@/views/TabsPage.vue'
import HomePage from '@/views/HomePage.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: TabsPage,
    meta: { requiresAuth: true }, // Set the default meta for authenticated routes
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
        meta: { requiresAuth: true } // Add requiresAuth meta to the home route
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginPage.vue')
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('@/views/TasksPage.vue')
      },
      {
        path: 'completed',
        name: 'Completed',
        component: () => import('@/views/CompletedPage.vue')
      },
      {
        path: 'library',
        name: 'Library',
        component: () => import('@/views/LibraryPage.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    // Guard to prevent logged-in users from accessing the login page
    meta: { requiresGuest: true }
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: AuthenticationPage,
    // Guard to prevent authenticated users from accessing the login page
    meta: { requiresLogin: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Route guards for authentication
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.user !== null; // Check if user is logged in
  const isAuthenticated = store.state.authUser === true; // Check if user is authenticated

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Protected route - requires authentication first
    if (!isAuthenticated) {
      // User is not authenticated, redirect to authentication
      next({ name: 'Authentication' });
    } else {
      // User is logged in, proceed to the route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresLogin)) {
    // Protected route - requires login first
    if (!isLoggedIn) {
      // User is not logged in, redirect to login
      next({ name: 'Login' });
    } else {
      // User is logged in, proceed to the route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Route accessible to guests only (like login page)
    if (isLoggedIn && isAuthenticated) {
      // User is already logged in and authenticated, redirect to home
      next({ name: 'Home' });
    } else {
      // Guest can access, proceed to the route
      next();
    }
  } else {
    // For routes that don't require login or authentication, proceed to the route
    next();
  }
});

export default router

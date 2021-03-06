import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

import Home from './views/Home.vue';

import UserLogin from './views/UserLogin.vue';
import UserRegister from './views/UserRegister.vue';
import UserForgotPassword from './views/UserForgotPassword.vue';
import UserProfile from './views/UserProfile.vue';

// Use Search-Replace to change 'Item' to the data type you need
import ItemArchive from './views/ItemArchive.vue';
import ItemSingle from './views/ItemSingle.vue';
import ItemCreate from './views/ItemCreate.vue';
import ItemEdit from './views/ItemEdit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
    meta: {
      title: 'Register',
    },
  },
  {
    path: '/forgot-password',
    name: 'UserForgotPassword',
    component: UserForgotPassword,
    meta: {
      title: 'Forgot Password',
    },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      title: 'Profile',
      authRequired: true,
    },
  },
  {
    path: '/items',
    name: 'ItemArchive',
    component: ItemArchive,
    meta: {
      title: 'All Items',
    },
  },
  {
    path: '/items/:id',
    name: 'ItemSingle',
    component: ItemSingle,
    meta: {
      title: 'Item',
    },
  },
  {
    path: '/create-item',
    name: 'ItemCreate',
    component: ItemCreate,
    meta: {
      title: 'Create Item',
      authRequired: true,
    },
  },
  {
    path: '/edit-item/:id',
    name: 'ItemEdit',
    component: ItemEdit,
    meta: {
      title: 'Edit Item',
      authRequired: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Set SEO metatag
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | My App`;
  next();
});

// Check if Auth is required
router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    if (!firebase.auth().currentUser) {
      next({
        name: 'UserLogin',
        query: { redirectTo: to.name },
      });
    }
  }

  next();
});

export default router;

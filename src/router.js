import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app';

import Home from "../views/Home.vue";

import UserLogin from "../views/UserLogin";
import UserRegister from "../views/UserRegister";
import UserForgotPassword from "../views/UserForgotPassword";
import UserProfile from "../views/UserProfile";

// Use Search-Replace to change "Item" to the data type you need
import ItemArchive from "../views/ItemArchive.vue";
import ItemSingle from "../views/ItemSingle";
import ItemCreate from "../views/ItemCreate";
import ItemEdit from "../views/ItemEdit";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/forgot-password',
    name: 'UserForgotPassword',
    component: UserForgotPassword,
    meta: {
      title: 'Forgot Password',
      authRequired: true,
    }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/items',
    name: 'ItemArchive',
    component: Items,
    meta: {
      title: 'All Items'
    }
  },
  {
    path: '/items/:id',
    name: 'ItemSingle',
    component: Item,
    meta: {
      title: 'Item'
    }
  },
  {
    path: '/create-item',
    name: 'ItemCreate',
    component: ItemCreate,
    meta: {
      title: 'Create Item',
      authRequired: true,
    }
  },
  
  {
    path: '/edit-item/:id',
    name: 'ItemEdit',
    component: ItemEdit,
    meta: {
      title: 'Edit Item',
      authRequired: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Set SEO metatag
router.beforeEach( (to, from, next) => {
  document.title = `${to.meta.title} | My App`;
  next();
} );

// Check if Auth is required
router.beforeEach( (to, from, next) => {
  if( to.meta.authRequired ) {
    if( !firebase.auth().currentUser ) {
      next({ name: 'Home' });
    }
  }

  next();
} );

export default router;
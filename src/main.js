import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});

<template>
<ul class="menu">
  <li class="menu-item">
    <router-link :to="{name: 'Home'}">Home</router-link>
  </li>
  <li class="menu-item">
    <router-link :to="{name: 'Items'}">Items</router-link>
  </li>
  <li class="menu-item">
    <router-link :to="{name: 'ItemCreate'}">Create Item</router-link>
  </li>
  <li class="menu-item" v-if="!$store.state.isUserLoggedIn">
    <router-link :to="{name: 'UserLogin'}">Login</router-link>
  </li>
  <li class="menu-item menu-item-has-children" v-if="$store.state.isUserLoggedIn">
    <a href="#">My Account</a>

    <ul class="sub-menu">
      <li class="sub-menu-item">
        <router-link :to="{name: 'UserProfile'}">Change Profile</router-link>
      </li>
      <li class="sub-menu-item">
        <a @click.prevent="logout" href="#logout">Logout</a>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'headerMenu',
  methods: {
    logout() {
      firebase.auth().signOut();
      window.location.reload();
    }
  }
}
</script>

<style>

</style>
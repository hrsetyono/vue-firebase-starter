<template>
<div class="user-form__wrapper">
  <form class="user-form">
    <h2>Login</h2>
    <label>
      <span>Email</span>
      <input type="email" placeholder="Enter your Email" v-model="email">
    </label>
    <label>
      <span>Password</span>
      <input type="password" v-model="password">
      <p class="has-text-align-right">Forgot Password?</p>
    </label>

    <div class="user-form__error" v-show="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="user-form__submit">
      <button @click.prevent="login">Log In</button>
    </div>
  </form>
  <p>
    Don't have an account? <router-link :to="{name: 'Register'}">Register Now</router-link>
  </p>
  <Loading v-if="isLoading" />
</div>
</template>

<script>
import Loading from '../components/Loading';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'login',
  components: {
    Loading
  },
  data() { return {
    email: '',
    password: '',

    errorMessage : '',
    isLoading: false,
  } },
  methods: {
    /**
     * Authorize user in Firebase. This will trigger the AuthStateChanged listener in App.vue
     */
    async login() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        await firebase.auth().signInWithEmailAndPassword( this.email, this.password );
        this.isLoading = false;
        this.$router.push({ name: 'Home' });
      }
      catch( error ) {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    }
  }
}
</script>

<style lang="sass">
</style>
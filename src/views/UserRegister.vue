<template>
<div class="user-form__wrapper">
  <form class="user-form" @submit.prevent="register">
    <h2>Register</h2>
    <label>
      <span>First Name</span>
      <input type="text" placeholder="Enter your First Name" v-model="firstName">
    </label>
    <label>
      <span>Last Name</span>
      <input type="text" placeholder="Enter your Last Name" v-model="lastName">
    </label>
    <label>
      <span>Email</span>
      <input type="email" placeholder="Enter your Email" v-model="email">
    </label>
    <label>
      <span>Password</span>
      <input type="password" v-model="password">
    </label>
    <label>
      <span>Confirm Password</span>
      <input type="password" v-model="passwordConfirm">
    </label>

    <div class="user-form__error" v-show="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="user-form__submit">
      <button type="submit">Register</button>
    </div>

  </form>
  <p class="form-foot-note">
    Already have an account? <router-link :to="{name: 'UserLogin'}">Login Now</router-link>
  </p>
  <Loading v-if="isLoading" />
</div>
</template>

<script>
import Loading from '../components/Loading';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase';

export default {
  name: 'register',
  components: {
    Loading
  },
  data() { return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',

    errorMessage: '',
    isLoading: false,
  } },
  methods: {
    /**
     * Register new user in Firebase
     */
    async register() {
      this.isLoading = true;
      this.errorMessage = '';

      // check error
      if( this.email === '' || this.password === '' || this.passwordConfirm === '' ) {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
        return;
      }

      try {
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword( this.email, this.password );
        const result = await createUser;

        this.isLoading = false;

        const database = db.collection( 'users' ).doc( result.user.uid );
        await database.set({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        });

        // redirect back to Login
        this.$router.push({
          name: 'UserLogin',
          query: { afterRegister: true }
        });
      }
      catch( error ) {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
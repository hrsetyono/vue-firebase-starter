<template>
  <div class="user-form__wrapper">
    <form class="user-form" @submit.prevent="register">
      <h2>Register</h2>
      <label>
        <span>First Name</span>
        <input
          v-model="firstName"
          type="text"
          placeholder="Enter your First Name"
        >
      </label>
      <label>
        <span>Last Name</span>
        <input
          v-model="lastName"
          type="text"
          placeholder="Enter your Last Name"
        >
      </label>
      <label>
        <span>Email</span>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your Email"
        >
      </label>
      <label>
        <span>Password</span>
        <input v-model="password" type="password">
      </label>
      <label>
        <span>Confirm Password</span>
        <input v-model="passwordConfirm" type="password">
      </label>

      <div v-show="errorMessage" class="user-form__error">
        {{ errorMessage }}
      </div>

      <div class="user-form__submit">
        <button type="submit">
          Register
        </button>
      </div>
    </form>
    <p class="form-foot-note">
      Already have an account?
      <router-link :to="{name: 'UserLogin'}">
        Login Now
      </router-link>
    </p>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase';
import Loading from '../components/Loading.vue';

export default {
  name: 'Register',
  components: {
    Loading,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',

      errorMessage: '',
      isLoading: false,
    };
  },
  methods: {
    /**
     * Register new user in Firebase
     */
    async register() {
      this.isLoading = true;
      this.errorMessage = '';

      // check error
      if (this.email === '' || this.password === '' || this.passwordConfirm === '') {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
        return;
      }

      try {
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;

        this.isLoading = false;

        const database = db.collection('users').doc(result.user.uid);
        await database.set({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        });

        // redirect back to Login
        this.$router.push({
          name: 'UserLogin',
          query: { afterRegister: true },
        });
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>

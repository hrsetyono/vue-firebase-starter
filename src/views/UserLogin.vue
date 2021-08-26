<template>
<div class="user-form__wrapper">
  <div class="toast" v-if="$route.query.afterRegister">
    Thank you for registering. You can now login with your account.
  </div>
  <form class="user-form" @submit.prevent="login">
    <h2>Login</h2>
    <label>
      <span>Email</span>
      <input type="email" placeholder="Enter your Email" v-model="email">
    </label>
    <label>
      <span>Password</span>
      <input type="password" v-model="password">
    </label>

    <div class="user-form__error" v-show="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="user-form__submit">
      <button type="submit">Log In</button>
    </div>
  </form>
  <p class="form-foot-note">
    <router-link :to="{name: 'UserRegister'}">Register Now</router-link> | <router-link :to="{name: 'UserForgotPassword'}">Forgot Password?</router-link>
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
      this.errorMessage = '';
      this.isLoading = true;

      try {
        await firebase.auth().signInWithEmailAndPassword( this.email, this.password );
        this.isLoading = false;

        // if redirected to login from secured page, redirect back after logging in
        if( this.$route.query.redirectTo ) {
          this.$router.push({ name: this.$route.query.redirectTo });
        } else {
          this.$router.push({ name: 'Home' });
        }
        
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
@import "../sass/vars"

.user-form__wrapper
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: var(--color1Light)
  padding: 2rem 0

  @media ($above-s)
    min-height: 500px

  > *
    width: var(--blogWidth)
    margin: 0 auto

  a
    text-decoration: underline
  a:hover
    color: var(--color1Dark)

.user-form
  display: flex
  flex-direction: column
  row-gap: 1rem
  column-gap: 1rem

  width: var(--blogWidth)
  background-color: var(--textInvert)
  padding: 1rem

  border: 1px solid rgba(--text, .3)
  border-radius: var(--gRadius)
  box-shadow: var(--shadow0)

.user-form__error
  color: red
  font-size: var(--smallFontSize)

.form-foot-note
  margin-top: 0.5rem
  text-align: center

.toast
  padding: 0.5rem
  margin-bottom: 1rem
  border-left: 4px solid var(--color1)
  background-color: var(--textInvert)
  box-shadow: var(--shadow0)


</style>
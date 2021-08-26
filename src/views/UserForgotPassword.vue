<template>
<div class="user-form__wrapper">
  <form class="user-form" @submit.prevent="requestPasswordReset">
    <h2>Reset Password</h2>
    <label>
      <span>Email</span>
      <input type="email" placeholder="Enter your Email" v-model="email">
    </label>

    <div class="user-form__submit">
      <button type="submit">Request Password Reset</button>
    </div>
  </form>
  <p class="form-foot-note">
    <router-link :to="{name: 'UserLogin'}">Back to Login</router-link>
  </p>
  <Modal v-if="isModalOpen" :message="modalMessage" v-on:closed="closeModal" />
  <Loading v-if="isLoading" />
</div>
</template>

<script>
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'forgotPassword',
  components: {
    Modal,
    Loading
  },
  data() { return {
    email: '',
    isModalOpen: false,
    isLoading: false,
    modalMessage: ''
  }},
  methods: {
    /**
     * Request Firebase to send email containing password reset link
     */
    async requestPasswordReset() {
      this.isLoading = true;

      try {
        await firebase.auth().sendPasswordResetEmail( this.email );

        this.isLoading = false;
        this.modalMessage = 'If your account exists, you will receive an email';
        this.isModalOpen = true;
      }
      catch( error ) {
        this.isLoading = false;
        this.modalMessage = error.message;
        this.isModalOpen = true;
      }
    },
    /**
     *
     */
    closeModal() {
      this.isModalOpen = false;
      this.email = '';
    },
  }
}
</script>

<style lang="sass" scoped>
</style>
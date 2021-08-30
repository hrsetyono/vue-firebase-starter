<template>
  <div class="user-form__wrapper">
    <form class="user-form" @submit.prevent="requestPasswordReset">
      <h2>Reset Password</h2>
      <label>
        <span>Email</span>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your Email"
        >
      </label>

      <div class="user-form__submit">
        <button type="submit">
          Request Password Reset
        </button>
      </div>
    </form>
    <p class="form-foot-note">
      <router-link :to="{name: 'UserLogin'}">
        Back to Login
      </router-link>
    </p>
    <Modal
      v-if="isModalOpen"
      :message="modalMessage"
      @closed="closeModal"
    />
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'ForgotPassword',
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      email: '',
      isModalOpen: false,
      isLoading: false,
      modalMessage: '',
    };
  },
  methods: {
    /**
     * Request Firebase to send email containing password reset link
     */
    async requestPasswordReset() {
      this.isLoading = true;

      try {
        await firebase.auth().sendPasswordResetEmail(this.email);

        this.isLoading = false;
        this.modalMessage = 'If your account exists, you will receive an email';
        this.isModalOpen = true;
      } catch (error) {
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
  },
};
</script>

<style lang="sass" scoped>
</style>

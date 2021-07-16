<template>
<div class="user-form__wrapper">
  <form class="user-form">
    <h2>Account Settings</h2>
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
      <input type="email" placeholder="Enter your Email" v-model="email" disabled>
      <small>This cannot be changed</small>
    </label>

    <div class="user-form__submit">
      <button @click="updateProfile">Update Profile</button>
    </div>
  </form>

  <Modal v-if="isModalOpen" :message="modalMessage" v-on:closed="closeModal" />
  <Loading v-if="isLoading" />
</div>
</template>

<script>
import db from './firebase';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

export default {
  name: 'profile',
  components: {
    Modal,
    Loading
  },
  data() { return {
    email: this.$store.state.userEmail,
    firstName: this.$store.state.userFirstName,
    lastName: this.$store.state.userLastName,

    isLoading: false,
    isModalOpen: false,
    modalMessage: 'Changes were saved',
  }},
  created() {

  },
  methods: {
    /**
     * Change User data in Firebase and update the $state
     */
    async updateProfile() {
      this.isLoading = true;

      const database = await db.collection( 'users' ).doc( state.userID );
      let payload = {
        firstName: state.userFirstName,
        lastName: state.userLastName,
      };
      await database.update( payload );

      await this.$store.commit( 'updateUserProfile', payload );
      this.isLoading = false;
      this.isModalOpen = true;
    },
    /**
     * 
     */
    closeModal() {
      this.isModalOpen = false;
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
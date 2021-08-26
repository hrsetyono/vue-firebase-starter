<template>
<div class="user-form__wrapper">
  <form class="user-form" @submit.prevent="updateProfile">
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
      <button type="submit">Update Profile</button>
    </div>
  </form>

  <Modal v-if="isModalOpen" :message="modalMessage" v-on:closed="closeModal" />
  <Loading v-if="isLoading" />
</div>
</template>

<script>
// import firebase from 'firebase/app';
// import 'firebase/auth';
import db from '../firebase';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

export default {
  name: 'profile',
  components: {
    Modal,
    Loading
  },
  data() { return {
    isLoading: false,
    isModalOpen: false,
    modalMessage: 'Changes were saved',
  }},
  created() {
    // populate the field, but wait for auth data
    // firebase.auth().onAuthStateChanged( user => {
    //   this.isLoading = false;

    //   if( user ) {
    //     this.email = this.$store.state.userEmail;
    //     this.firstName = this.$store.state.userFirstName;
    //     this.lastName = this.$store.state.userLastName;
    //   }
    // });
  },
  methods: {
    /**
     * Change User data in Firebase and update the $state
     */
    async updateProfile() {
      this.isLoading = true;

      const database = await db.collection( 'users' ).doc( this.$store.state.userID );
      let payload = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
      await database.update( payload );

      this.isLoading = false;
      this.isModalOpen = true;
    },
    /**
     * 
     */
    closeModal() {
      this.isModalOpen = false;
    },

    commit( key, value ) {
      this.$store.commit( 'updateProfile', { key, value } );
    },
  },
  
  computed: {
    email() { return this.$store.state.userEmail; },
    firstName: {
      get() {
        return this.$store.state.userFirstName;
      },
      set( value ) {
        this.commit( 'userFirstName', value );
      }
    },
    lastName: {
      get() {
        return this.$store.state.userLastName;
      },
      set( value ) {
        this.commit( 'userLastName', value );
      }
    }
  },
}
</script>

<style lang="sass" scoped>
</style>
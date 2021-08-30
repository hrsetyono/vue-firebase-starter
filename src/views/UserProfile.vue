<template>
  <div class="user-form__wrapper">
    <form
      v-if="$store.state.userEmail"
      class="user-form"
      @submit.prevent="updateProfile"
    >
      <h2>Account Settings</h2>
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
          disabled
        >
        <small>This cannot be changed</small>
      </label>

      <div class="user-form__submit">
        <button type="submit">
          Update Profile
        </button>
      </div>
    </form>

    <Modal
      v-if="isModalOpen"
      :message="modalMessage"
      @closed="closeModal"
    />
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import db from '../firebase';
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'UserProfile',
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      isModalOpen: false,
      modalMessage: 'Changes were saved',
    };
  },
  computed: {
    email() {
      return this.$store.state.userEmail;
    },
    firstName: {
      get() {
        return this.$store.state.userFirstName;
      },
      set(value) {
        this.$store.commit('updateProfile', {
          value,
          key: 'userFirstName',
        });
      },
    },
    lastName: {
      get() {
        return this.$store.state.userLastName;
      },
      set(value) {
        this.$store.commit('updateProfile', {
          value,
          key: 'userLastName',
        });
      },
    },
  },
  methods: {
    /**
     * Change User data in Firebase and update the $state
     */
    async updateProfile() {
      this.isLoading = true;

      const database = await db.collection('users').doc(this.$store.state.userID);
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
      await database.update(payload);

      this.isLoading = false;
      this.isModalOpen = true;
    },

    /**
     * Close the modal
     */
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style lang="sass" scoped>
</style>

<template>
<main role="main">
  
  <div class="cover">
    <img class="cover__background" src="">
    <div class="cover__inner">
      <h1>Welcome to My App</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut at inventore ab et eius laudantium labore non optio maxime quas sequi nemo autem error magni similique beatae, sapiente quos minus!
      </p>
    </div>
  </div>

  <h3 class="alignwide">Latest Items</h3>
  <Items :items="items" />

  <section class="group / alignfull has-background-color has-color-1-background-color has-text-color has-text-invert-color">
    <div class="group__inner">
      <h3>Interested to Join Us?</h3> 
      <div class="buttons">
        <router-link class="button" :to="{name: 'UserRegister'}">
          Register Now
        </router-link>
      </div>
    </div>
  </section>

</main>
</template>

<script>
import Items from '../components/Items';

export default {
  name: 'home',
  components: {
    Items
  },
  data() { return {
    items: [],
  } },
  /**
   * Get Latest items
   */
  async mounted() {
    this.items = await this.$store.dispatch( 'getItems', 4 );
  },
};
</script>

<style lang="sass" scoped>
</style>
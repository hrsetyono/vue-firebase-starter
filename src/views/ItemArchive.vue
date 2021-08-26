<template>
<main role="main">
  <h3 class="alignwide">All Items</h3>
  <Items :items="items" @deleted="onItemDeleted" />
</main>
</template>

<script>
import Items from '../components/Items';

export default {
  name: 'itemArchive',
  components: {
    Items
  },
  data() { return {
    items: []
  } },
  
  /**
   * Get Latest items
   */
  async mounted() {
    this.items = await this.$store.dispatch( 'getItems' );
  },

  methods: {
    /**
     * Remove the item from the list after getting deleted
     */
    async onItemDeleted( id ) {
      this.items = await this.items.filter( p => {
        return p.id !== id;
      } );
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
<template>
  <main role="main">
    <h3 class="alignwide">
      All Items
    </h3>
    <Items
      v-if="!isLoading"
      :items="items"
      @deleted="onItemDeleted"
    />
  </main>
</template>

<script>
import Items from '../components/Items.vue';

export default {
  name: 'ItemArchive',
  components: {
    Items,
  },
  data() {
    return {
      items: [],
      isLoading: true,
    };
  },

  /**
   * Get Latest items
   */
  async mounted() {
    this.items = await this.$store.dispatch('getItems');
    this.isLoading = false;
  },

  methods: {
    /**
     * Remove the item from the list after getting deleted
     */
    async onItemDeleted(id) {
      this.items = await this.items.filter((p) => p.id !== id);
    },
  },
};
</script>

<style lang="sass" scoped>
</style>

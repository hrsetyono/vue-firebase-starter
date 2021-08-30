<template>
  <div class="item-form__wrapper">
    <h1>Edit Item</h1>
    <ItemForm
      v-if="item"
      :item="item"
      submit-text="Edit Item"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import ItemForm from '../components/ItemForm.vue';

export default {
  name: 'ItemEdit',
  components: {
    ItemForm,
  },
  data() {
    return {
      item: null,
    };
  },

  /**
   * Get the Item data to pre-populate the field
   */
  async mounted() {
    this.item = await this.$store.dispatch('getItem', this.$route.params.id);
  },

  methods: {
    /**
     * After submitted
     */
    async onSubmit(payload) {
      await this.$store.dispatch('updateItem', payload);
      this.$router.push({ name: 'ItemSingle', params: { id: payload.id } });
    },
  },
};
</script>

<style lang="sass" scoped>
.item-form__wrapper
  max-width: var(--siteWidth)
  margin: var(--blockSpacing) auto

</style>

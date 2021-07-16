<template>
<div class="item-form__wrapper">
  <h1>Edit Item</h1>
  <ItemForm :item="item" submit-text="Edit Item" @submit="onSubmit" />
</div>
</template>

<script>
import ItemForm from '../components/ItemForm';

export default {
  name: 'itemEdit',
  components: {
    ItemForm
  },
  data() { return {
    item: [],
  }},
  /**
   * Get the Item data to pre-populate the field
   */
  async mounted() {
    this.item = await this.$store.dispatch( 'getItem', this.$route.params.id );
  },
  methods: {
    async onSubmit( payload ) {
      await this.$store.dispatch( 'updateItem', payload );
      this.$router.push({ name: 'ItemSingle', params:{ id: payload.id } }); 
    },
  }
}
</script>

<style lang="sass" scoped>
</style>
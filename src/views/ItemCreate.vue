<template>
  <div class="item-form__wrapper">
    <h1>Create Item</h1>
    <ItemForm submit-text="Create Item" @submit="onSubmit" />
  </div>
</template>

<script>
import ItemForm from '../components/ItemForm.vue';

export default {
  name: 'ItemCreate',
  components: {
    ItemForm,
  },
  data() {
    return {};
  },
  methods: {
    async onSubmit(payload) {
      const itemID = await this.$store.dispatch('createItem', payload);
      this.$router.push({ name: 'ItemSingle', params: { id: itemID } });
    },
  },
};
</script>

<style lang="sass" scoped>
.item-form__wrapper
  max-width: var(--siteWidth)
  margin: var(--blockSpacing) auto

</style>

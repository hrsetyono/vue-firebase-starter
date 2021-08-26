<template>
<ul class="item-list alignwide" v-if="items.length">
  <li v-for="(item, index) in items" :key="index">
    
    <router-link :to="{name: 'ItemSingle', params: { id: item.id }}">
      <figure class="item-list__image" v-if="item.imageURL">
        <img :src="item.imageURL" :alt="item.title">
      </figure>
      
      <h3>{{ item.title }}</h3>
      <div class="item-list__excerpt">
        {{ item.excerpt }}
      </div>
    </router-link>

    <div class="item-list__actions" v-if="$store.state.isLoggedIn">
      <router-link :to="{name: 'ItemEdit', params:{ id: item.id }}">
        Edit
      </router-link>
      <a href="#" @click.prevent="deleteItem">
        Delete
      </a>
    </div>

  </li>
</ul>
<div v-else class="has-text-align-center">
  <h2>No Items Found</h2>
  <p>Sorry, there is no item yet</p>
</div>
</template>

<script>
export default {
  name: 'items',
  props: [ 'items' ],
  components: {},
  methods: {
    /**
     * Delete an item
     */
    async deleteItem( id ) {
      if( window.confirm( 'Are you sure you want to delete this item?' ) ) {
        this.$store.dispatch( 'deleteItem', id );
        this.$emit( 'deleted', id );
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.item-list
  display: grid
  grid-template-columns: repeat(3, 1fr)
  padding-left: 0
  list-style-type: none

.item-list__image
  margin-bottom: 0.5rem

</style>
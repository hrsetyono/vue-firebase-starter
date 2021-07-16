<template>
<div class="single-item">
  <div class="single-item__body" v-if="item">
    <figure class="featured-image" data-image-fit="2:1">
      <img :src="item.imageURL" :alt="item.title + ' Thumbnail'">
    </figure>
    
    <header class="the-title">
      <h1>{{ item.title }}</h1>
      <time>Created on: {{ new Date(item.date).toLocaleString("en-us", { dateStyle: "long" }) }}
    </header>

    <main v-html="item.content"></main>
  </div>
  <div class="single-item__body" v-else>
    <main>
      <h2>404 Not Found</h2>
      <p>
        The item you are looking for does not exist or have been deleted.
      </p>
    </main>
  </div>

  <div class="single-item__related">
    <h2>Other Items</h2>
    <Items :items="relatedItems" />
  </div>
</div>
</template>

<script>
import Items from '../components/Items';

export default {
  name: 'itemSingle',
  components: [
    Items,
  ],
  data() { return {
    relatedItems: [],
    item: {}
  }},
  /**
   * Get item using the ID in URL and Related Items
   */
  async mounted() {
    this.item = await this.$store.dispatch( 'getItem', this.$route.params.id );
    this.relatedItems = await this.$store.dispatch( 'getItems', 4 );
  }
}
</script>

<style lang="sass" scoped>
</style>
<template>
  <div class="single-item">
    <div v-if="item" class="single-item__body">
      <figure class="featured-image" data-image-fit="2:1">
        <img :src="item.imageURL" :alt="item.title + ' Thumbnail'">
      </figure>

      <header class="the-title">
        <h1>{{ item.title }}</h1>
        <time>
          Created on: {{ new Date(item.date).toLocaleString("en-us", { dateStyle: "long" }) }}
        </time>
      </header>

      <main>
        {{ item.content }}
      </main>
    </div>
    <div v-else class="single-item__body">
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
import Items from '../components/Items.vue';

export default {
  name: 'ItemSingle',
  components: {
    Items,
  },
  data() {
    return {
      relatedItems: [],
      item: {},
    };
  },
  /**
   * Get item using the ID in URL and Related Items
   */
  async mounted() {
    this.item = await this.$store.dispatch('getItem', this.$route.params.id);
    this.relatedItems = await this.$store.dispatch('getItems', 4);
  },
};
</script>

<style lang="sass" scoped>
.featured-image
  max-width: var(--blogWidth)
  margin: 0 auto

.the-title
  margin: var(--blockSpacing) auto
  max-width: var(--blogWidth)

.single-item__related
  max-width: var(--siteWidth)
  margin: var(--groupSpacing) auto 0

  h2
    margin-bottom: var(--blockSpacing)
</style>

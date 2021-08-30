<template>
  <ul
    v-if="items.length"
    class="item-list alignwide"
    data-attr="as"
  >
    <li v-for="(item, index) in items" :key="index">
      <router-link :to="{name: 'ItemSingle', params: { id: item.id }}">
        <figure v-if="item.imageURL" class="item-list__image">
          <img :src="item.imageURL" :alt="item.title">
        </figure>

        <h3>{{ item.title }}</h3>
        <div class="item-list__excerpt">
          {{ item.excerpt }}
        </div>
      </router-link>

      <div v-if="$store.state.isLoggedIn" class="item-list__actions">
        <router-link :to="{name: 'ItemEdit', params:{ id: item.id }}">
          <PencilSVG />
          <span>Edit</span>
        </router-link>
      </div>
    </li>
  </ul>
  <div v-else class="has-text-align-center">
    <h2>No Items Found</h2>
    <p>Sorry, there is no item yet</p>
  </div>
</template>

<script>
import PencilSVG from '../svg/pencil.svg';

export default {
  name: 'Items',
  components: {
    PencilSVG,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="sass">
.item-list
  display: grid
  grid-template-columns: repeat(3, 1fr)
  row-gap: var(--blockSpacing)
  column-gap: var(--blockSpacing)
  padding-left: 0
  list-style-type: none

  a
    text-decoration: none

  li
    position: relative

  h3
    text-decoration: none

  a:hover h3
    text-decoration: underline

.item-list__image
  position: relative
  height: 0
  padding-bottom: 50%
  margin-bottom: 0.5rem

  img
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center center

.item-list__actions
  position: absolute
  top: 0.25rem
  right: 0.25rem

  a
    display: flex
    align-items: center
    padding: 0.25rem 0.5rem
    border: 1px solid rgba(black, .2)
    border-radius: var(--gRadius)
    background-color: var(--textInvert)
    box-shadow: var(--shadow0)

  a:hover
    background-color: var(--color1Light)
    color: inherit

  svg
    margin-right: 0.5rem
    width: 1rem
    height: 1rem

  span
    font-weight: 700
    text-transform: uppercase
    letter-spacing: 0.025em

</style>

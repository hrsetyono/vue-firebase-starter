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
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512"><path d="M491.609 73.625l-53.861-53.839c-26.378-26.379-69.075-26.383-95.46-.001L24.91 335.089.329 484.085c-2.675 16.215 11.368 30.261 27.587 27.587l148.995-24.582 315.326-317.378c26.33-26.331 26.581-68.879-.628-96.087zM200.443 311.557C204.739 315.853 210.37 318 216 318s11.261-2.147 15.557-6.443l119.029-119.03 28.569 28.569L210 391.355V350h-48v-48h-41.356l170.259-169.155 28.569 28.569-119.03 119.029c-8.589 8.592-8.589 22.522.001 31.114zM82.132 458.132l-28.263-28.263 12.14-73.587L84.409 338H126v48h48v41.59l-18.282 18.401-73.586 12.141zm378.985-319.533l-.051.051-.051.051-48.03 48.344-88.03-88.03 48.344-48.03.05-.05.05-.05c9.147-9.146 23.978-9.259 33.236-.001l53.854 53.854c9.878 9.877 9.939 24.549.628 33.861z"/></svg>
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
export default {
  name: 'items',
  props: [ 'items' ],
  components: {},
  methods: {}
}
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
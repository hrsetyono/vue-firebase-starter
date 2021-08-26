<template>
  <div class="modal">
    <div class="modal__inner">
      <p>{{ message }}</p>
      <a href="#close" @click.prevent="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: [ 'message' ],
  methods: {
    close() {
      this.$emit( 'closed' );
    }
  }
}
</script>

<style lang="sass" scoped>
.modal
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(black, .1)

.modal__inner
  position: relative
  width: 300px
  box-shadow: 0 0 4px 6px rgba(black, .1)

  padding: 1.5rem
  background-color: white
  text-align: center

  * + *
    margin-top: 1rem

[href="#close"]
  position: absolute
  top: 0
  right: 0
  margin: 0
  opacity: .5
  transform: translateY(-75%) translateX(75%)

  &:hover
    opacity: .25

  svg
    width: 1.75rem
    height: 1.75rem
</style>
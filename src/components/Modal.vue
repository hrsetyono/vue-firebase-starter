<template>
  <div class="modal">
    <div class="modal__inner">
      <p>{{ message }}</p>
      <button @click="close">Close</button>
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
  width: 300px
  box-shadow: 0 0 4px 6px rgba(black, .1)

  padding: 1.5rem
  background-color: white

  p
    margin-bottom: 1rem
</style>
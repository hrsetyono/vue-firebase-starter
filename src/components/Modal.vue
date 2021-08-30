<template>
  <div class="modal">
    <div class="modal__inner">
      <p>{{ message }}</p>
      <a href="#close" @click.prevent="close">
        <CloseSVG />
      </a>
    </div>
  </div>
</template>

<script>
import CloseSVG from '../svg/close.svg';

export default {
  name: 'Modal',
  components: {
    CloseSVG,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('closed');
    },
  },
};
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

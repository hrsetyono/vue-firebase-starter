<template>
<header class="header header-mobile">
  <div class="header__inner">
    <router-link class="logo" :to="{name: 'Home'}">
      <img :src="require('../images/logo.png')" alt="">
    </router-link>

    <a @click.prevent="toggle" href="#menu">Menu</a>
  </div>

  <transition name="offcanvas">
    <aside class="offcanvas" v-show="isOpen">
      <div class="offcanvas__inner">
        <HeaderMenu />

        <a @click.prevent="toggle" href="#menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>
          <span>Close</span>
        </a>
      </div>
    </aside>
  </transition>
</header>
</template>

<script>
export default {
  name: 'headerMobile',
  data() { return {
    isOpen: false,
  } },
  methods: {
    /**
     * Open the hidden menu
     */
    toggle() {
      this.isOpen = !this.isOpen;
    }
  },
}
</script>

<style lang="sass" scoped>
@import '../sass/vars';

.offcanvas
  cursor: default
  position: fixed
  z-index: 100
  top: 0
  bottom: 0
  right: 0

  background: var(--text)
  width: 420px
  max-width: 420px

  color: var(--textInvert)
  font-size: var(--mediumFontSize)
  box-shadow: var(--shadow3)

  //
  @media ($below-xs)
    width: 320px
    max-width: 320px


// before enter
.offcanvas-enter
  visibility: hidden
  opacity: 0
  transform: translateX(100%)

// when enter animation is running
.offcanvas-enter-active
  transition: var(--gTransition)

// enter animation finish line
.offcanvas-enter-to
  visibility: visible
  opacity: 1
  transform: none

// when leaving animation is running
.offcanvas-leave-active
  transition: none

// leaving animation finish line
.offcanvas-leave-to
  transform: translateX(100%)


.offcanvas__inner
  display: flex
  flex-direction: column
  justify-content: center
  align-items: flex-start

  overflow-y: auto
  height: 100%
  padding: 2.5rem 2rem
  list-style-type: none

  -webkit-overflow-scrolling: touch

  @media ($below-s)
    padding-right: 1rem
    padding-left: 1rem
 

// Close button
.offcanvas > a[href="#menu"]
  position: absolute
  z-index: 10
  top: 0.5rem
  right: 1rem

  display: flex
  align-items: center
  justify-content: center

  width: 2rem
  height: 2rem
  border-radius: var(--gRadius)
  font-size: 0
  color: transparent

  path
    fill: var(--textInvert)
  &:hover
    opacity: .75
</style>
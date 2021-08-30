<template>
  <header class="header header-mobile">
    <div class="header__inner">
      <router-link class="logo" :to="{name: 'Home'}">
        <img :src="require('../images/logo.png')" alt="">
      </router-link>

      <a href="#menu" @click.prevent="toggle">Menu</a>
    </div>

    <transition name="offcanvas">
      <aside v-show="isOpen" class="offcanvas">
        <div class="offcanvas__inner">
          <HeaderMenu />

          <a href="#menu" @click.prevent="toggle">
            <CloseSVG />
            <span>Close</span>
          </a>
        </div>
      </aside>
    </transition>
  </header>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue';
import CloseSVG from '../svg/close.svg';

export default {
  name: 'HeaderMobile',
  components: {
    HeaderMenu,
    CloseSVG,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    /**
     * Open the hidden menu
     */
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
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

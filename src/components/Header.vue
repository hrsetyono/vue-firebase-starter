<template>
<header class="header" role="navigation">
  <div class="header__bottom">
    <router-link class="logo" :to="{name: 'Home'}">
      <img :src="require('../images/logo.png')" alt="">
    </router-link>

    <HeaderMenu />
  </div>
</header>
</template>

<script>
import HeaderMenu from './HeaderMenu';

export default {
  name: 'headerDesktop',
  components: {
    HeaderMenu
  },
  data() {
    return {
      mobile: false,
      windowWidth: 0
    };
  },
  created() {
    window.addEventListener( 'resize', this.checkScreen );
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;

      if( this.windowWidth <= 750 ) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.isMobileNavOpen = false;
      }
    },

    
  },
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'

.header
  position: relative
  z-index: 100
  background-color: var(--text)
  transition: var(--gTransition)

.header__bottom
  --headerPadding: 0

  display: flex
  align-items: center
  position: sticky
  top: 0
  max-width: var(--siteWidth)
  margin: 0 auto


  @media ($below-nav)
    display: none


.logo
  display: flex
  flex-direction: column

  img
    width: auto
    max-height: var(--logoMaxHeight, 40px)
    transition: var(--gTransition)
    will-change: transform

  &:hover
    img
      opacity: .75
      transform: translateY(-2px)

  // tagline
  span
    font-size: var(--smallFontSize)
    color: var(--text)

  .footer &
    justify-content: flex-start
    width: 100%

  

</style>
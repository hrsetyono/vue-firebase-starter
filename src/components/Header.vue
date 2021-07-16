<template>
<header class="header" role="navigation">
  <div class="header__bottom">
    <router-link class="logo" :to="{name: 'Home'}">
      <img :src="require('../assets/logo.png')" alt="">
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

</style>
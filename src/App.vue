<template>
  <div id="app">
    <Header v-show="!isMobile" />
    <HeaderMobile v-show="isMobile" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import Footer from './components/Footer';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'app',
  components: {
    Header,
    HeaderMobile,
    Footer
  },
  data() { return {
    isMobile: false,
    windowWidth: 0
  } },
  created() {
    firebase.auth().onAuthStateChanged( user => {
      this.$store.commit( 'updateLoggedInUser', user );

      if( user ) {
        this.$store.dispatch( 'getCurrentUser' );
      }
    });

    // Check current window size
    window.addEventListener( 'resize', this.checkScreen );
    this.checkScreen();

    // Check current route
    this.checkRoute();
  },
  methods: {
    /**
     * Update window size so it can show the correct Header
     */
    checkScreen() {
      this.windowWidth = window.innerWidth;

      if( this.windowWidth <= 768 ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    
    /**
     * Check current route and do something with it
     */
    checkRoute() {
      // console.log( this.$route.name );
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  },
};
</script>

<style lang="sass">
// If you are using VS Code, install the "Sass" extension to properly highlight syntax

@import "./sass/vars"
@import "./sass/vars-root"
@import "./sass/normalize"
@import "./sass/main"
</style>

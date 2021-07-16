<template>
<footer class="footer">
  <div class="footer__top" data-columns="3">
    <div class="footer__column">
      <h3>My App</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aperiam nam eius, numquam veniam praesentium cum reprehenderit magni omnis nobis officia dolor at vero explicabo illo sint ut amet obcaecati.
      </p>

      <div class="social-links">
        <a class="social-link" href="#">Facebook</a>
        <a class="social-link" href="#">Twitter</a>
        <a class="social-link" href="#">Instagram</a>
      </div>
    </div>
    <div class="footer__column">
      <h3>Important Links</h3>
      <HeaderMenu />
    </div>
  </div>
  <div class="footer__bottom" data-columns="1">
    <div class="footer__column">
      <p>Copyright 2021 All Rights Reserved</p>
    </div>
  </div>
</footer>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu';

export default {
  name: 'mainFooter',
  components: {
    HeaderMenu
  }
}
</script>

<style lang="sass" scoped>
</style>
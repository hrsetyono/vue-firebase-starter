<template>
  <footer class="footer">
    <div class="footer-row" data-columns="3">
      <div class="footer-column">
        <h3>My App</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aperiam nam eius, numquam veniam praesentium cum reprehenderit magni omnis nobis officia dolor at vero explicabo illo sint ut amet obcaecati.
        </p>
      </div>
      <div class="footer-column">
        <h3>Important Links</h3>
        <HeaderMenu />
      </div>
      <div class="footer-column">
        <h3>Follow Us</h3>
        <div class="social-links">
          <a class="social-link" href="#">
            <FacebookSVG />
          </a>
          <a class="social-link" href="#">
            <TwitterSVG />
          </a>
          <a class="social-link" href="#">
            <InstagramSVG />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-row is-footer-bottom" data-columns="1">
      <div class="footer-column">
        <p class="copyright">
          Copyright {{ year }} All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue';
import FacebookSVG from '../svg/logo-facebook.svg';
import TwitterSVG from '../svg/logo-twitter.svg';
import InstagramSVG from '../svg/logo-instagram.svg';

export default {
  name: 'MainFooter',
  components: {
    HeaderMenu,
    FacebookSVG,
    TwitterSVG,
    InstagramSVG,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="sass" scoped>
@import '../sass/vars'

.footer
  background-color: var(--text)
  margin-top: var(--groupSpacing)

  h3
    font-size: var(--h4Size)

.footer-row
  display: flex
  justify-content: center
  column-gap: var(--blockSpacing)
  row-gap: var(--blockSpacing)

  max-width: var(--siteWidth)
  margin: 0 auto
  padding-top: var(--footerPadding, 2rem)
  padding-bottom: var(--footerPadding, 2rem)
  background-color: transparent
  color: var(--textInvert)

  &.is-footer-bottom
    --footerPadding: 0.25rem
    font-size: var(--smallFontSize)

  @media ($below-nav)
    flex-direction: column

.footer-column
  display: flex
  flex-direction: column
  flex: 1
  padding: 0
  height: 100%
  list-style-type: none

  > * + *
    margin-top: 1rem

  @media ($below-s)
    width: 100%
    align-items: center

.footer .menu
  margin-left: 0

.copyright
  width: 100%
  text-align: center
  opacity: .75

.social-links

  a + a
    margin-left: 1rem
  a:hover
    opacity: .75
  svg
    width: 1.5rem
    height: 1.5rem
  path
    fill: var(--textInvert)

</style>

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
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="50" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
        </a>
        <a class="social-link" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
        </a>
        <a class="social-link" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="50" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
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
import HeaderMenu from '../components/HeaderMenu';

export default {
  name: 'mainFooter',
  components: {
    HeaderMenu
  },
  data() { return {
    year: new Date().getFullYear(),
  } },
}
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
<template>
<ul class="menu">
  <li class="menu-item">
    <router-link :to="{name: 'Home'}">Home</router-link>
  </li>
  <li class="menu-item">
    <router-link :to="{name: 'ItemArchive'}">Items</router-link>
  </li>
  <li class="menu-item">
    <router-link :to="{name: 'ItemCreate'}">Create Item</router-link>
  </li>
  <li class="menu-item" v-if="!$store.state.isLoggedIn">
    <router-link :to="{name: 'UserLogin'}">Login</router-link>
  </li>
  <li class="menu-item menu-item-has-children" v-if="$store.state.isLoggedIn">
    <a href="#">My Account</a>

    <ul class="sub-menu">
      <li class="sub-menu-item">
        <router-link :to="{name: 'UserProfile'}">Change Profile</router-link>
      </li>
      <li class="sub-menu-item">
        <a @click.prevent="logout" href="#logout">Logout</a>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'headerMenu',
  methods: {
    logout() {
      firebase.auth().signOut();
      window.location.reload();
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'

.menu
  --navPadding: 1.5rem 0.75rem
  
  display: flex
  flex-wrap: wrap
  margin-left: auto
  list-style-type: none
  padding: 0
  color: var(--textInvert)
  transition: var(--gTransition)

.menu-item
  position: relative

  .footer &
    --navPadding: 0.5rem
    width: 50%

.menu-item > a
  display: flex
  align-items: center
  height: 100%
  padding: var(--navPadding, 0.5rem)

  line-height: 1
  font-size: var(--navFontSize, inherit)
  font-weight: var(--hFontWeight)
  color: inherit

  .footer &
    letter-spacing: 0.025em
    text-transform: uppercase
    background-color: transparent

  .offcanvas &
    letter-spacing: 0.025em

  &::before
    content: ""
    display: block
    visibility: hidden
    opacity: 0

    position: absolute
    bottom: 0
    left: 10px
    right: 10px
    height: 4px
    background-color: var(--color1)

    transition: var(--gTransition)
  
    .footer &
      display: none


.menu-item > a:hover
  .footer &
    background-color: rgba(white, .2)
    text-decoration: underline

  .offcanvas &
    background-color: var(--navBgHover, rgba(var(--color1RGB), .3))
    opacity: .75

  &::before
    visibility: visible
    opacity: 1


// active state
.current-menu-item > a,
.current-page-ancestor > a,
.current-menu-ancestor > a,
.current-menu-parent > a,
.current_page_parent > a
  color: var(--color1)

  .offcanvas &
    background-color: var(--navBgHover)
    opacity: 1

  &::before
    visibility: visible
    opacity: 1


// Add down arrow if has children
.menu-item-has-children > a
  &::after
    content: ""
    display: block
    margin-left: 0.25rem
    width: 0.5rem
    height: 0.5rem
    // background: url('../svg/chevron-down.svg') no-repeat center center
    background-size: 100% auto
    opacity: .75

    @media ($below-nav)
      display: none

    .footer &
      display: none


///// CHILDREN MENU

.sub-menu
  --dropdownColumns: 1

  position: absolute
  z-index: 10
  top: calc(100% + 4px)
  left: 50%
  visibility: hidden
  opacity: 0

  min-width: calc(180px * var(--dropdownColumns))
  max-width: calc(220px * var(--dropdownColumns))
  padding: 0.75em 0.5em
  border-radius: var(--gRadius)
  background-color: var(--text)

  text-align: left
  list-style-type: none

  transition: var(--gTransition)
  transform: translateX(-50%)
  box-shadow: var(--shadow2)

  .footer &
    display: none

  .offcanvas &
    overflow: hidden
    padding-left: 1rem
    list-style-type: none
    transition: var(--gTransition)

  .menu-item:hover &
    visibility: visible
    opacity: 1

  // need to be separated with ":hover" for browser support
  .menu-item:focus-within &
    visibility: visible
    opacity: 1


.sub-menu-item
  display: block
  color: var(--textInvert)

  border-radius: var(--gRadius)

  &:hover
    background-color: var(--color1)

  a
    display: block 
    padding: 0.375rem 0.75rem
</style>
<template>
<form class="item-form" action="" @submit.prevent="saveItem">
  <label class="item-form__field is-title-field">
    <span>Title</span>
    <input type="text" placeholder="Enter Item's name" v-model.trim="title">
  </label>
  
  <label class="item-form__field is-image-field">
    <span>Thumbnail Image</span>
    <input type="file" @change="imageChange" accept=".png, .jpg, ,jpeg" />
    <img :src="imageURL" v-if="imageURL">
  </label>

  <label class="item-form__field">
    <span>Content</span>
    <vue-editor :editorOptions="editorSettings"
      v-model.trim="content" useCustomImageHandler
      @image-added="imageHandler" />
  </label>
  
  <div class="item-form__error" v-show="errorMessage">
    {{ errorMessage }}
  </div>
  <div class="buttons">
    <button type="submit">{{ submitText }}</button>

    <button class="button is-delete-button" v-if="isEditForm" @click.prevent="deleteItem">
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="50" viewBox="0 0 448 512"><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg>
      <span>Delete</span>
    </button>
  </div>

  <Loading v-show="isLoading" />
</form>
</template>

<script>
import Quill from 'quill';
import Loading from './Loading';

window.Quill = Quill;
const ImageResize = require( 'quill-image-resize-module' ).default;
Quill.register( 'modules/imageResize', ImageResize );

export default {
  name: 'itemForm',
  props: [ 'item', 'submitText' ],
  components: {
    Loading
  },
  data() { return {
    title: '',
    content: '',
    imageFile: null,
    imageURL: '',
    imageName: '',

    isLoading: false,
    errorMessage: '',
    editorSettings: {
      modules: { imageResize: {} }
    },
  }},
  /**
   * Pre-populate field if this is an Edit Form
   */
  mounted() {
    if( this.$props.item ) {
      this.title = this.$props.item.title;
      this.content = this.$props.item.content;
      this.imageURL = this.$props.item.imageURL;
      this.imageName = this.$props.item.imageName;
    }
  },
  computed: {
    isEditForm() {
      return this.$props.item || false;
    },
  },
  methods: {
    /**
     * 
     */
    async saveItem() {
      this.isLoading = true;

      // Error validation
      if( this.title === '' || this.content === '' ) {
        this.errorMessage = 'You must fill in Title and Content';
        this.isLoading = false;
        return;
      }
      if( !this.imageURL ) {
        this.errorMessage = 'Please upload Featured Image';
        this.isLoading = false;
        return;
      }

      // If has file, it means a new Upload
      if( this.imageFile ) {
        this.imageURL = await this.$store.dispatch( 'uploadImage', {
          file: this.imageFile,
          name: this.imageName
        } );
      }

      let payload = {};

      if( this.isEditForm ) {
        payload = {
          id: this.$props.item.id,
          title: this.title,
          content: this.content,
          imageURL: this.imageURL,
          imageName: this.imageName
        };
      }
      // if Create New Form
      else {
        const timestamp = Date.now();
        payload = {
          title: this.title,
          content: this.content,
          imageURL: this.imageURL,
          imageName: this.imageName,
          author: this.$store.state.userID,
          date: timestamp,
        };
      }

      this.$emit( 'submit', payload );
    },

    /**
     * Delete an item
     */
    async deleteItem() {
      if( window.confirm( 'Are you sure you want to delete this item?' ) ) {
        this.$emit( 'delete' );
      }
    },
    
    /**
     * Featured image listener
     */
    imageChange( e ) {
      this.imageFile = e.currentTarget.files[0];
      this.imageName = this.imageFile.name;
      this.imageURL = URL.createObjectURL( this.imageFile ); // create Blob that can be used as 'src'
    },

    /**
     * Listener for inserting Image into Editor
     */
    async imageHandler( file, Editor, cursorLocation, resetUploader ) {
      let photoURL = await this.$store.dispatch( 'uploadImage', {
        file: file,
        name: file.name
      } );

      Editor.insertEmbed( cursorLocation, 'image', photoURL );
      resetUploader();
    },
  }
}
</script>

<style lang="sass" scoped>
.item-form
  display: flex
  flex-wrap: wrap
  row-gap: var(--blockSpacing)
  column-gap: var(--blockSpacing)

.item-form__field
  width: 100%

  span
    display: block
    margin-bottom: 0.25rem

.is-title-field
  flex: 1

.is-image-field
  position: relative
  cursor: pointer
  flex: 1

  input
    cursor: pointer
  
  img
    position: absolute
    top: 0
    right: 0
    max-width: 8rem
    max-height: 8rem
    border: 2px solid var(--textInvert)
    box-shadow: var(--shadow0)

  &:hover
    background-color: rgba(black, .05)


.item-form__error
  width: 100%
  color: red


.is-delete-button
  margin-left: auto
  background-color: red


</style>
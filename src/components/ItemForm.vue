<template>
<form class="item-form" action="">
  <label>
    <span>Title</span>
    <input type="text" placeholder="Enter Item's name" v-model.trim="title">
  </label>
  <label>
    <span>Content</span>
    <vue-editor :editorOptions="editorSettings"
      v-model.trim="content" useCustomImageHandler
      @image-added="imageHandler" />
  </label>

  <label class="item-form__image">
    <input type="file" @change="imageChange" accept=".png, .jpg, ,jpeg" />
    <img :src="imageURL" v-if="imageURL">
  </label>
  
  <div class="item-form__error" v-show="errorMessage">
    {{ errorMessage }}
  </div>
  <div class="item-form__submit">
    <button @click="saveItem">{{ submitText }}</button>
  </div>

  <Loading v-show="isLoading" />
</form>
</template>

<script>
import Quill from 'quill';

window.Quill = Quill;
const ImageResize = require( 'quill-image-resize-module' ).default;
Quill.register( 'modules/imageResize', ImageResize );

export default {
  name: 'itemForm',
  props: [ 'item', 'submitText' ],
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

      // if Edit Form
      if( this.$props.item ) {
        payload = {
          title: this.title,
          content: this.content,
          imageURL: this.imageURL,
          imageName: this.imageName
        };
      }
      // if Create Form
      else {
        const timestamp = Date.now();
        payload = {
          title: this.title,
          content: this.content,
          imageURL: this.imageURL,
          imageName: this.imageName,
          author: this.$store.state.profile.id,
          date: timestamp,
        };
      }

      this.$emit( 'submit', payload );
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

<style>

</style>
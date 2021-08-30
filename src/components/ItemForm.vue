<template>
  <form
    class="item-form"
    action=""
    @submit.prevent="saveItem"
  >
    <label class="item-form__field is-title-field">
      <span>Title</span>
      <input
        v-model.trim="title"
        type="text"
        placeholder="Enter Item's name"
      >
    </label>

    <label class="item-form__field is-image-field">
      <span>Thumbnail Image</span>
      <input
        type="file"
        accept=".png, .jpg, ,jpeg"
        @change="imageChange"
      >
      <img v-if="imageURL" :src="imageURL">
    </label>

    <label class="item-form__field">
      <span>Content</span>
      <textarea
        ref="content"
        v-model.trim="content"
        rows="8"
      />
    </label>

    <div v-show="errorMessage" class="item-form__error">
      {{ errorMessage }}
    </div>
    <div class="buttons">
      <button type="submit">
        {{ submitText }}
      </button>
      <button
        v-if="isEditForm"
        class="button is-delete-button"
        @click.prevent="deleteItem"
      >
        <TrashSVG />
        <span>Delete</span>
      </button>
    </div>

    <Loading v-show="isLoading" />
  </form>
</template>

<script>
import hMarkdownEditor from 'edje-markdown-editor';
import Loading from './Loading.vue';
import TrashSVG from '../svg/trash.svg';
import 'edje-markdown-editor/dist/main.css';

export default {
  name: 'ItemForm',
  components: {
    Loading,
    TrashSVG,
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
  },
  data() {
    return {
      title: '',
      content: '',
      imageFile: null,
      imageURL: '',
      imageName: '',

      isLoading: false,
      errorMessage: '',
    };
  },
  computed: {
    isEditForm() {
      return this.$props.item || false;
    },
  },
  mounted() {
    // Add toolbar to textarea
    this.$nextTick(() => {
      hMarkdownEditor(this.$refs.content);
    });

    // Pre-populate field if this is an Edit Form
    if (this.$props.item) {
      this.title = this.$props.item.title;
      this.content = this.$props.item.content;
      this.imageURL = this.$props.item.imageURL;
      this.imageName = this.$props.item.imageName;
    }
  },
  methods: {
    /**
     * Save the item
     */
    async saveItem() {
      this.isLoading = true;

      // Error validation
      if (this.title === '' || this.content === '') {
        this.errorMessage = 'You must fill in Title and Content';
        this.isLoading = false;
        return;
      }
      if (!this.imageURL) {
        this.errorMessage = 'Please upload Featured Image';
        this.isLoading = false;
        return;
      }

      // If has file, it means a new Upload
      if (this.imageFile) {
        this.imageURL = await this.$store.dispatch('uploadImage', {
          file: this.imageFile,
          name: this.imageName,
        });
      }

      let payload = {};

      if (this.isEditForm) {
        payload = {
          id: this.$props.item.id,
          title: this.title,
          content: this.content,
          imageURL: this.imageURL,
          imageName: this.imageName,
        };
      } else { // if Create New Form
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

      this.$emit('submit', payload);
    },

    /**
     * Delete an item
     */
    async deleteItem() {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await this.$store.dispatch('deleteItem', this.$props.item.id);
        this.$router.push({ name: 'ItemArchive' });
      }
    },

    /**
     * Featured image listener
     */
    imageChange(e) {
      this.imageFile = e.currentTarget.files[0];
      this.imageName = this.imageFile.name;

      // create Blob that can be used as 'src'
      this.imageURL = URL.createObjectURL(this.imageFile);
    },
  },
};
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

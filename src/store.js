import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/storage";
import db from './firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  // This is global data, use mutations and actions to change this value.
  state: {
    isLoggedIn: false,
    userID: 0,
    userEmail: '',
    userFirstName: '',
    userLastName: '',
  },
  mutations: {
    updateLoggedInUser( state, payload ) {
      state.isLoggedIn = payload;
    },

    setUserProfile( state, doc ) {
      state.userID = doc.id;
      state.userEmail = doc.data().email;
      state.userFirstName = doc.data().firstName;
      state.userLastName = doc.data().lastName;
    },

    /**
     * Update stored profile. payload needs to have `key` and `value`.
     */
    updateProfile( state, payload ) {
      state[payload.key] = payload.value;
    },
  },
  actions: {
    /**
     * Get Current User data and set it in $state
     */
    async getCurrentUser( {commit} ) {
      const database = await db.collection( 'users' ).doc( firebase.auth().currentUser.uid );
      const dbResult = await database.get();
      
      commit( 'setUserProfile', dbResult );
    },

    /**
     * Get multiple items
     */
    async getItems( context, limit = 20 ) {
      const database = await db.collection( 'items' ).orderBy( 'date', 'desc' ).limit( limit );
      const result = await database.get();

      let items = [];
      result.forEach( doc => {
        items.push( doc.data() );
      });

      return items;
    },

    /**
     * Get 1 item
     */
    async getItem( context, postID ) {
      const database = await db.collection( 'items' ).doc( postID );
      const result = await database.get();
      return result.data();
    },

    /**
     * Create new item
     */
    async createItem( context, payload ) {
      const database = await db.collection( 'items' ).doc();
      payload.id = database.id;
      await database.set( payload );
      return payload.id;
    },

    /**
     * Update existing item 
     */
    async updateItem( context, payload ) {
      const database = await db.collection( 'items' ).doc( payload.id );
      await database.update( payload );
    },

    /**
     * Delete existing item 
     */
    async deleteItem( context, id ) {
      const item = await db.collection( 'items' ).doc( id );
      await item.delete();
    },

    /**
     * Upload image into Firebase Storage
     */
    async uploadImage( context, {file, name} ) {
      const storage = firebase.storage().ref();
      const doc = storage.child( `uploads/${ name }` );
      
      await doc.put( file );
      let downloadURL = await doc.getDownloadURL();
      return downloadURL;
    },
  },

  modules: {
  }
})

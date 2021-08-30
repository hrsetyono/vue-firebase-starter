import firebase from 'firebase/app';
import 'firebase/firestore';

// var firebaseConfig = {
//   apiKey: '1234567890abcdefghijklmnopqrstuvwxyz',
//   authDomain: 'your-project.firebaseapp.com',
//   projectId: 'your-project-abcde',
//   storageBucket: 'your-project.appspot.com',
//   messagingSenderId: '1234567890',
//   appId: '1:1234567890:web:1234567890abcdefghij',
//   measurementId: 'G-G123ABC456'
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBZ36yCgKG299MOdNbPFuyaemkLk9SxXOw',
  authDomain: 'tutorial-blog-86d5e.firebaseapp.com',
  projectId: 'tutorial-blog-86d5e',
  storageBucket: 'tutorial-blog-86d5e.appspot.com',
  messagingSenderId: '409425802966',
  appId: '1:409425802966:web:282a1f588bf9cf4269fb77',
  measurementId: 'G-G9EP2WG0DC',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();

# Vue Firebase Starter

This is a template for starting a project with Firebase as backend and Vue as frontend.

Contains:

- **ACCOUNT pages**: Login, Register, Forgot password, Change profile.
- **CRUD pages**: Create, Read, Update, Delete a blog post.
- Basic styling with Normalize and CSS Variables.

Based on [Firebase-Vue tutorial](https://www.youtube.com/watch?v=ISv22NNL-aE) by Traversy Media.

## Initial Setup

Install dependencies:

```
npm install
```

Open `src/firebase.js` and replace the firebaseConfig with the one given by Firebase.

```
var firebaseConfig = {
  apiKey: "1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-abcde",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890abcdefghij",
  measurementId: "G-G123ABC456"
};
```

## Command List

Run this command to initialize Localhost server:

```
npm run dev
```

Before launching, minify the assets by running this command:

```
npm run build
```
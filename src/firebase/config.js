import firebase from 'firebase/compat/app'

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBnudp31y36RXMPJ21PKfrsVLKoj6DmX5s",
    authDomain: "chat-app-ba5f7.firebaseapp.com",
    projectId: "chat-app-ba5f7",
    storageBucket: "chat-app-ba5f7.appspot.com",
    messagingSenderId: "605109672908",
    appId: "1:605109672908:web:4fcf2dbe1c66b983b49b69",
    measurementId: "G-NVVC2SMY0H"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
  const auth = firebase.auth();

  auth.useEmulator('http://localhost:9099');
  if(window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
  }

  export { auth, db };
  export default firebase;
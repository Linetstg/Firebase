// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';

import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeTJBoqNsuxgy5IprdM53MPn6MGC9QOXs",
  authDomain: "test-cfd43.firebaseapp.com",
  projectId: "test-cfd43",
  storageBucket: "test-cfd43.appspot.com",
  messagingSenderId: "458617849175",
  appId: "1:458617849175:web:d295ea341e9117c43eaa12",
  measurementId: "G-9SW95YM7FN"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const stor = firebase.storage();

export {
  stor, firebase as default
}

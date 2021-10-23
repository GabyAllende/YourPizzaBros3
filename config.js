
const firebase = require('firebase')

//YPB3
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXyGp_AK-2n7atboPbQCAmATWSO4t53-M",
  authDomain: "yourpizzabros3.firebaseapp.com",
  projectId: "yourpizzabros3",
  storageBucket: "yourpizzabros3.appspot.com",
  messagingSenderId: "639778295816",
  appId: "1:639778295816:web:7264b8fe7e2ee8bef041bd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const ingrediente = db.collection("Ingrediente");
module.exports = ingrediente;
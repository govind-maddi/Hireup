// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {  getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUBYI7TaGKdIZSk3pujgOeQvouFoUv7Xw",
  authDomain: "hireup-50d98.firebaseapp.com",
  projectId: "hireup-50d98",
  storageBucket: "hireup-50d98.appspot.com",
  messagingSenderId: "237739951587",
  appId: "1:237739951587:web:c763c797b40816db404cd6",
  measurementId: "G-R19XCNEHRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
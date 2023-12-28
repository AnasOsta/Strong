// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvVcxNFeVjwHXqqEXcCPIYxr4l__h-up4",
  authDomain: "strong-ddb41.firebaseapp.com",
  projectId: "strong-ddb41",
  storageBucket: "strong-ddb41.appspot.com",
  messagingSenderId: "16877286551",
  appId: "1:16877286551:web:9cf5a846bbf2031701a5d2",
  measurementId: "G-1S77BKJ7FH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbauth = getAuth(app);
export const db = getFirestore(app);

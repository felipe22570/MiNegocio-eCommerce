// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyA416CzQAcOwY3y6fna7IRzRnWh_7mNeZc",
   authDomain: "pruebatecnica-academiageek.firebaseapp.com",
   projectId: "pruebatecnica-academiageek",
   storageBucket: "pruebatecnica-academiageek.appspot.com",
   messagingSenderId: "950247142692",
   appId: "1:950247142692:web:0c770ff9ecb052729cefb1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const db = getFirestore();

export { app, google, facebook, db };

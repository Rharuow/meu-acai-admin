// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: "meu-acai-4a917.firebaseapp.com",
  projectId: "meu-acai-4a917",
  storageBucket: "meu-acai-4a917.appspot.com",
  messagingSenderId: "543706933330",
  appId: "1:543706933330:web:260bfeefdd8b89ab8ad78b",
  measurementId: "G-JQ897SNTX0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// collections

export const userCollection = collection(db, "users");

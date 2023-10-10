// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { FacebookAuthProvider, getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcQMCmZ53ze2_pZpXKtNmjVFWu7lT6XPQ",
  authDomain: "first-6cb2b.firebaseapp.com",
  projectId: "first-6cb2b",
  storageBucket: "first-6cb2b.appspot.com",
  messagingSenderId: "107991833921",
  appId: "1:107991833921:web:c36e7eb57c587f6f1555c0",
  measurementId: "G-447MR9E81P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const faceProvider=new FacebookAuthProvider();
export const storage=getStorage(app)



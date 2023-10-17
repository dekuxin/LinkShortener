import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwnVN4xdiFo0NwTDV7AX-fA4s1oxfjWZM",
  authDomain: "linkshortener-bc2c5.firebaseapp.com",
  projectId: "linkshortener-bc2c5",
  storageBucket: "linkshortener-bc2c5.appspot.com",
  messagingSenderId: "1023954459085",
  appId: "1:1023954459085:web:ce9da82ee50234d911cc84"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
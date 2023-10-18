// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQofh2PPAx2AvKY_h5a5fYzUww4lFBJwU",
  authDomain: "daleyfootwear.firebaseapp.com",
  projectId: "daleyfootwear",
  storageBucket: "daleyfootwear.appspot.com",
  messagingSenderId: "83874966169",
  appId: "1:83874966169:web:ab7abb37626b4608466608"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdumiYWDqLdNyAOJPKmtIZkHU71AKzp50",
  authDomain: "first-task-309eb.firebaseapp.com",
  projectId: "first-task-309eb",
  storageBucket: "first-task-309eb.appspot.com",
  messagingSenderId: "133792406479",
  appId: "1:133792406479:web:daef2f6b70f6be473050ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
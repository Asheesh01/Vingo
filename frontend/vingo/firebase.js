// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-14bf3.firebaseapp.com",
  projectId: "vingo-14bf3",
  storageBucket: "vingo-14bf3.firebasestorage.app",
  messagingSenderId: "721911154369",
  appId: "1:721911154369:web:3da31f6049b7723e5df640"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}
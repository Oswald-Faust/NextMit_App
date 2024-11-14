import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCAVEWdQ5O9uJWIetPk3YrRS2q8Li08sNs",
    authDomain: "evenix-5a453.firebaseapp.com",
    projectId: "evenix-5a453",
    storageBucket: "evenix-5a453.firebasestorage.app",
    messagingSenderId: "780423030851",
    appId: "1:780423030851:web:a197be4abea669e2d80cf6",
    measurementId: "G-G92TTRKMDV"
  };
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
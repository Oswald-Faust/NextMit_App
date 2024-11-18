import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

const auth = initializeAuth(app, {
    persistence: browserLocalPersistence
});

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
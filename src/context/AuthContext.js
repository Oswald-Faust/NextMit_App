import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  PhoneAuthProvider,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Récupérer les données utilisateur de Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        setUser(user);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Inscription avec email/mot de passe
  const signUp = async (email, password, name, phone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          phone: phone || '',
          createdAt: serverTimestamp(),
        });
        
        // Envoi de l'email de vérification
        await sendEmailVerification(userCredential.user);
        
        return userCredential.user;
      }
    } catch (error) {
      console.error('Erreur signup:', error);
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Problème de connexion réseau');
      }
      throw error;
    }
  };

  // Connexion avec email/mot de passe
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Connexion avec Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          createdAt: new Date().toISOString()
        });
      }
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Connexion avec Facebook
  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          createdAt: new Date().toISOString()
        });
      }
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signUp,
      signIn,
      signOut,
      signInWithGoogle,
      signInWithFacebook,
      resetPassword,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
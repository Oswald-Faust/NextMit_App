import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged, getAuth } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = getAuth().currentUser;
      await sendEmailVerification(currentUser);
      return userCredential;
    } catch (error) {
      console.error('Erreur inscription:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        throw new Error('Email non vérifié');
      }
      return userCredential;
    } catch (error) {
      console.error('Erreur connexion:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        await userService.updateOnlineStatus(uid, false);
      }
      await auth.signOut();
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
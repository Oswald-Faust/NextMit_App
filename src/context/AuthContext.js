import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Charger les données utilisateur depuis Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Erreur chargement données utilisateur:', error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, name, phone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        phone: phone || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return userCredential.user;
    } catch (error) {
      console.error('Erreur inscription:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      return userCredential.user;
    } catch (error) {
      console.error('Erreur connexion:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
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
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
      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Créer le profil utilisateur dans Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        phone: phone || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Envoyer l'email de vérification
      await sendEmailVerification(userCredential.user);
      
      return userCredential.user;
    } catch (error) {
      console.error('Erreur inscription:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Cet email est déjà utilisé');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Email invalide');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }
      throw new Error('Erreur lors de l\'inscription');
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Charger les données utilisateur
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      
      return userCredential.user;
    } catch (error) {
      console.error('Erreur connexion:', error);
      if (error.code === 'auth/user-not-found') {
        throw new Error('Aucun compte trouvé avec cet email');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Mot de passe incorrect');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Email invalide');
      }
      throw new Error('Erreur lors de la connexion');
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
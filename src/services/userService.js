import { db, auth } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { USER_COLLECTION } from '../models/userModel';
import { PhoneAuthProvider } from 'firebase/auth';
import { updateEmail } from 'firebase/auth';

export const userService = {
  // Créer un nouvel utilisateur
  createUser: async (userData) => {
    try {
      const userRef = doc(db, USER_COLLECTION, auth.currentUser.uid);
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isVerified: false,
        notificationsEnabled: true,
      });
    } catch (error) {
      console.error('Erreur création utilisateur:', error);
      throw error;
    }
  },

  // Obtenir les données d'un utilisateur
  getUserData: async (userId = auth.currentUser?.uid) => {
    try {
      const userRef = doc(db, USER_COLLECTION, userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Erreur récupération utilisateur:', error);
      throw error;
    }
  },

  // Mettre à jour le profil utilisateur
  updateUserProfile: async (updates) => {
    try {
      const userRef = doc(db, USER_COLLECTION, auth.currentUser.uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      throw error;
    }
  },

  // Mettre à jour la photo de profil
  updateProfilePhoto: async (photoURL) => {
    try {
      const userRef = doc(db, USER_COLLECTION, auth.currentUser.uid);
      await updateDoc(userRef, {
        photoURL,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erreur mise à jour photo:', error);
      throw error;
    }
  },

  // Mettre à jour les préférences de notification
  updateNotificationPreferences: async (enabled) => {
    try {
      const userRef = doc(db, USER_COLLECTION, auth.currentUser.uid);
      await updateDoc(userRef, {
        notificationsEnabled: enabled,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erreur mise à jour notifications:', error);
      throw error;
    }
  },

  // Vérification du numéro de téléphone
  verifyPhoneNumber: async (phoneNumber) => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(phoneNumber);
      return verificationId;
    } catch (error) {
      throw error;
    }
  },

  // Mise à jour des informations de profil complètes
  updateFullProfile: async (userData) => {
    try {
      const userRef = doc(db, USER_COLLECTION, auth.currentUser.uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      });
      
      // Si l'email a changé
      if (userData.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, userData.email);
      }
    } catch (error) {
      throw error;
    }
  },

  // Gestion des préférences utilisateur
  updateUserPreferences: async (preferences) => {
    try {
      const userRef = doc(db, USER_COLLECTION, auth.currentUser.uid);
      await updateDoc(userRef, {
        preferences,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  }
}; 
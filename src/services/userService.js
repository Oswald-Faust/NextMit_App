import { db, auth, storage } from '../config/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const userService = {
  // Créer un nouveau profil utilisateur
  async createUserProfile(userData) {
    try {
      const userRef = doc(db, 'users', userData.uid);
      const userProfile = {
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        photoURL: null,
        username: null,
        bio: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isOnline: true,
        lastSeen: serverTimestamp(),
        preferences: {
          notifications: true,
          language: 'fr',
          theme: 'dark'
        },
        following: [],
        followers: [],
        eventsAttending: [],
        eventsCreated: [],
        socialLinks: {}
      };

      await setDoc(userRef, userProfile);
      return userProfile;
    } catch (error) {
      console.error('Erreur création profil:', error);
      throw error;
    }
  },

  // Mettre à jour le profil
  async updateUserProfile(uid, updates) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      throw error;
    }
  },

  // Uploader une photo de profil
  async uploadProfilePhoto(uid, photoUri) {
    try {
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const photoRef = ref(storage, `users/${uid}/profile.jpg`);
      
      await uploadBytes(photoRef, blob);
      const photoURL = await getDownloadURL(photoRef);
      
      await this.updateUserProfile(uid, { photoURL });
      return photoURL;
    } catch (error) {
      console.error('Erreur upload photo:', error);
      throw error;
    }
  },

  // Suivre/Ne plus suivre un utilisateur
  async toggleFollow(currentUserId, targetUserId) {
    try {
      const currentUserRef = doc(db, 'users', currentUserId);
      const targetUserRef = doc(db, 'users', targetUserId);
      
      const currentUserDoc = await getDoc(currentUserRef);
      const isFollowing = currentUserDoc.data().following.includes(targetUserId);

      if (isFollowing) {
        await updateDoc(currentUserRef, {
          following: arrayRemove(targetUserId)
        });
        await updateDoc(targetUserRef, {
          followers: arrayRemove(currentUserId)
        });
      } else {
        await updateDoc(currentUserRef, {
          following: arrayUnion(targetUserId)
        });
        await updateDoc(targetUserRef, {
          followers: arrayUnion(currentUserId)
        });
      }
    } catch (error) {
      console.error('Erreur toggle follow:', error);
      throw error;
    }
  },

  // Mettre à jour le statut en ligne
  async updateOnlineStatus(uid, isOnline) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        isOnline,
        lastSeen: serverTimestamp()
      });
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      throw error;
    }
  }
};

export default userService; 
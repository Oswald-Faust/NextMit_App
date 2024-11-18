import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../constants';

const ProfileScreen = ({ navigation }) => {
  const { user, userData, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    bio: userData?.bio || '',
    notificationsEnabled: userData?.notificationsEnabled ?? true,
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      // Gérer l'erreur (afficher un message, etc.)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image 
            source={user?.photoURL ? { uri: user.photoURL } : require('../assets/eat.png')}
            style={styles.avatar}
          />
          <Text style={styles.changePhotoText}>Changer la photo</Text>
        </TouchableOpacity>
        <Text style={styles.userName}>{userData?.name || user?.displayName}</Text>
      </View>

      <View style={styles.infoSection}>
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoHeader}>
            <Ionicons name="pencil" size={24} color={COLORS.primary} />
            <Text style={styles.infoTitle}>Description de mon profil</Text>
          </View>
          <Text style={styles.infoContent}>{userData?.bio || "Ajoutez une description..."}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Adresse E-mail</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Numéro de téléphone</Text>
          <Text style={styles.infoValue}>{userData?.phone || "Ajouter un numéro"}</Text>
        </TouchableOpacity>

        <View style={styles.notificationSection}>
          <Text style={styles.infoLabel}>Notifications</Text>
          <TouchableOpacity style={styles.toggleButton}>
            <View style={[styles.toggle, { backgroundColor: COLORS.primary }]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.walletSection}>
          <Ionicons name="wallet-outline" size={24} color={COLORS.primary} />
          <Text style={styles.walletText}>Portefeuille ADDB</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          <Text style={styles.signOutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Sauvegarder</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: COLORS.primary,
    marginLeft: 'auto',
    fontSize: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  changePhotoText: {
    color: '#fff',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoSection: {
    padding: 16,
  },
  infoItem: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  infoContent: {
    color: '#666',
    fontSize: 14,
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
  },
  notificationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    width: 51,
    height: 31,
    backgroundColor: '#1C1C1E',
    borderRadius: 15.5,
    padding: 2,
  },
  toggle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: COLORS.primary,
    marginLeft: 20,
  },
  walletSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  signOutText: {
    color: '#FF6B6B',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 'auto',
  },
  cancelButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
});

export default ProfileScreen; 
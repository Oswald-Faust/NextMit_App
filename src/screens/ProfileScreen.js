import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { user, userData, signOut } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerModifier}>Modifier</Text>
      </View>

      {/* Profile Photo Section */}
      <View style={styles.photoSection}>
        <Text style={styles.changePhoto}>Changer la photo</Text>
        <Image
          source={userData?.photoURL ? { uri: userData.photoURL } : require('../assets/eat.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userData?.name || "KABILTH Kabira"}</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.infoContainer}>
        {/* Description */}
        <TouchableOpacity style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <Ionicons name="pencil" size={24} color="#A4D437" />
            <Text style={styles.infoTitle}>Description de mon profil</Text>
          </View>
          <Text style={styles.infoContent}>{userData?.bio || "In a UX Designer job, you'll need both types of skills"}</Text>
        </TouchableOpacity>

        {/* Email */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Adresse E-mail</Text>
          <Text style={styles.infoContent}>{userData?.email || "email@gmail.com"}</Text>
          <TouchableOpacity style={styles.modifyButton}>
            <Text style={styles.modifyText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* Phone */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Numero de téléphone</Text>
          <Text style={styles.infoContent}>{userData?.phone || "+229 62642307"}</Text>
          <TouchableOpacity style={styles.modifyButton}>
            <Text style={styles.modifyText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.notificationSection}>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#A4D437' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
          <Text style={styles.notificationText}>Notifications</Text>
          <Ionicons name="notifications-outline" size={24} color="#A4D437" />
        </View>

        {/* ADDB Wallet */}
        <TouchableOpacity style={styles.walletSection}>
          <View style={styles.walletLeft}>
            <Ionicons name="wallet-outline" size={24} color="#A4D437" />
            <Text style={styles.walletText}>Portefeuille ADDB</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
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
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerModifier: {
    color: '#A4D437',
    fontSize: 16,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  changePhoto: {
    color: '#fff',
    fontSize: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
  },
  infoSection: {
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
    fontSize: 18,
    marginLeft: 8,
  },
  infoLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  infoContent: {
    color: '#fff',
    fontSize: 16,
  },
  modifyButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modifyText: {
    color: '#A4D437',
    fontSize: 14,
  },
  notificationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  notificationText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
  walletSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelText: {
    color: '#000',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#A4D437',
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
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';

const ProfileScreen = ({ navigation }) => {
  const { navigateWithAuth } = useProtectedNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [email, setEmail] = useState('email@gmail.com');
  const [phone, setPhone] = useState('+229 62642307');
  const [description, setDescription] = useState("In a UX Designer job, you'll need both types of skills");
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempDescription, setTempDescription] = useState(description);

  const handleSave = (type) => {
    switch (type) {
      case 'email':
        setEmail(tempEmail);
        setIsEditingEmail(false);
        break;
      case 'phone':
        setPhone(tempPhone);
        setIsEditingPhone(false);
        break;
      case 'description':
        setDescription(tempDescription);
        setIsEditingDescription(false);
        break;
    }
  };

  const handleCancel = (type) => {
    switch (type) {
      case 'email':
        setTempEmail(email);
        setIsEditingEmail(false);
        break;
      case 'phone':
        setTempPhone(phone);
        setIsEditingPhone(false);
        break;
      case 'description':
        setTempDescription(description);
        setIsEditingDescription(false);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.modifyButton}>
            <Text style={styles.modifyText}>Modifier</Text>
          </TouchableOpacity>

          <View style={styles.photoSection}>
            <Text style={styles.changePhotoText}>Changer la photo</Text>
            <TouchableOpacity style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>👨</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>KABILTH Kabira</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <TouchableOpacity 
            style={styles.descriptionHeader}
            onPress={() => setIsEditingDescription(true)}
          >
            <Feather name="edit-2" size={20} color="#fff" />
            <Text style={styles.descriptionTitle}>Description de mon profil</Text>
          </TouchableOpacity>
          {isEditingDescription ? (
            <View>
              <TextInput
                style={styles.input}
                value={tempDescription}
                onChangeText={setTempDescription}
                multiline
              />
              <View style={styles.editButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => handleCancel('description')}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={() => handleSave('description')}
                >
                  <Text style={styles.saveButtonText}>Sauvegarder</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.descriptionText}>{description}</Text>
          )}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Adresse E-mail</Text>
              {isEditingEmail ? (
                <View>
                  <TextInput
                    style={styles.input}
                    value={tempEmail}
                    onChangeText={setTempEmail}
                  />
                  <View style={styles.editButtons}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => handleCancel('email')}
                    >
                      <Text style={styles.cancelButtonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.saveButton}
                      onPress={() => handleSave('email')}
                    >
                      <Text style={styles.saveButtonText}>Sauvegarder</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text style={styles.infoValue}>{email}</Text>
              )}
            </View>
            {!isEditingEmail && (
              <TouchableOpacity onPress={() => setIsEditingEmail(true)}>
                <Text style={styles.modifyText}>Modifier</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Numero de téléphone</Text>
              {isEditingPhone ? (
                <View>
                  <TextInput
                    style={styles.input}
                    value={tempPhone}
                    onChangeText={setTempPhone}
                  />
                  <View style={styles.editButtons}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => handleCancel('phone')}
                    >
                      <Text style={styles.cancelButtonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.saveButton}
                      onPress={() => handleSave('phone')}
                    >
                      <Text style={styles.saveButtonText}>Sauvegarder</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text style={styles.infoValue}>{phone}</Text>
              )}
            </View>
            {!isEditingPhone && (
              <TouchableOpacity onPress={() => setIsEditingPhone(true)}>
                <Text style={styles.modifyText}>Modifier</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.notificationRow}>
            <Text style={styles.notificationText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#3A3A3A', true: '#9ACD32' }}
              thumbColor="#fff"
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <TouchableOpacity style={styles.bellIcon}>
              <Ionicons name="notifications-outline" size={24} color="#9ACD32" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="history" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Mes stories</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <Feather name="shopping-bag" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Mes paniers</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="receipt-long" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Mes commandes</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.walletButton}>
            <View style={styles.walletIcon}>
              <Text style={styles.walletNumber}>24</Text>
            </View>
            <Text style={styles.walletText}>Portefeuille ADDB</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <View style={[styles.menuIcon, { backgroundColor: '#FF4444' }]}>
              <Feather name="slash" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Blocage</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <View style={[styles.menuIcon, { backgroundColor: '#FF4444' }]}>
              <Feather name="trash-2" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Supprimer mon compte</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <Feather name="file-text" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Conditions d'utilisations</Text>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Feather name="log-out" size={24} color="#FF8C00" />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav 
        handleNavigation={navigateWithAuth}
        currentScreen="Profile"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  modifyButton: {
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  modifyText: {
    color: '#9ACD32',
    fontSize: 16,
    fontWeight: '500',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 30,
  },
  changePhotoText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  descriptionTitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  descriptionText: {
    color: '#666',
    fontSize: 14,
    paddingHorizontal: 16,
  },
  infoSection: {
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  infoContent: {
    flex: 1,
    marginRight: 16,
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
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  notificationText: {
    color: '#666',
    fontSize: 14,
  },
  bellIcon: {
    marginLeft: 12,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#9ACD32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  walletIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#9ACD32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  walletNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 12,
  },
  logoutText: {
    color: '#FF8C00',
    fontSize: 16,
    marginLeft: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#9ACD32',
    paddingVertical: 12,
    borderRadius: 30,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default ProfileScreen;
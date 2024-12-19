import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../constants/theme';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [user.uid]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await userService.getUserProfile(user.uid);
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
      setBio(userProfile.bio || '');
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      Alert.alert(
        'Erreur',
        'Impossible de charger votre profil. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom est obligatoire');
      return;
    }

    try {
      setIsSaving(true);
      await userService.updateUserProfile(user.uid, { name, email, bio });
      Alert.alert('Succès', 'Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      Alert.alert(
        'Erreur',
        'Impossible de mettre à jour votre profil. Veuillez réessayer.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Nom:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom..."
          placeholderTextColor="#666"
          onChangeText={setName}
          value={name}
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f5f5f5' }]}
          placeholder="Entrez votre e-mail..."
          placeholderTextColor="#666"
          onChangeText={setEmail}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>Bio:</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          multiline
          placeholder="Écrivez quelque chose sur vous..."
          placeholderTextColor="#666"
          onChangeText={setBio}
          value={bio}
        />

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          <LinearGradient
            colors={[COLORS.primary, '#9400D3']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginBottom: 30,
    color: '#000',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FONTS.regular,
    backgroundColor: '#fff',
    color: '#000',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default ProfileScreen; 
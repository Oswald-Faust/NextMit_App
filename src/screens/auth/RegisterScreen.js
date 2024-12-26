import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import PhoneInput from '../../components/PhoneInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerificationPopup from '../../components/VerificationPopup';
import CustomToast from '../../components/CustomToast';

const API_URL = Platform.select({
  android: __DEV__ 
    ? 'http://192.168.8.197:5000/api/v1'  // Votre IP Wi-Fi
    : 'http://localhost:5000/api/v1',
  ios: __DEV__
    ? 'http://192.168.8.197:5000/api/v1'  // Même IP
    : 'http://localhost:5000/api/v1',
  default: 'http://localhost:5000/api/v1'
});

const RegisterScreen = ({ navigation }) => {
  const { signUp } = useAuth();
  console.log('signUp function:', signUp);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error'
  });
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const showToast = (message, type = 'error') => {
    setToast({
      visible: true,
      message,
      type
    });
  };

  const handleRegister = async () => {
    console.log('Début de la tentative d\'inscription');
    console.log('Données du formulaire:', formData);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      showToast('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!formData.email.includes('@')) {
      showToast('Format d\'email invalide');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      console.log('Envoi de la requête à:', `${API_URL}/auth/register`);
      const requestBody = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
      };

      console.log('Données envoyées:', requestBody);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Statut de la réponse:', response.status);
      const data = await response.json();
      console.log('Données reçues:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      try {
        // Stocker le token et les données utilisateur
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));

        // Mettre à jour le contexte d'authentification
        await signUp(data.token);

        // Afficher le popup de vérification
        setShowVerificationPopup(true);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du contexte:', error);
        showToast('Inscription réussie mais erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      showToast(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationPopupClose = () => {
    setShowVerificationPopup(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('../../assets/eat.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Inscription</Text>

       <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/_Facebook.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/_Google.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
      </View>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, { width: '48%' }]}
            placeholder="Prénom"
            placeholderTextColor="#666"
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          />
          <TextInput
            style={[styles.input, { width: '48%' }]}
            placeholder="Nom"
            placeholderTextColor="#666"
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        <PhoneInput
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          error={toast.visible && toast.message.includes('téléphone')}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            placeholderTextColor="#666"
            secureTextEntry={!formData.showPassword}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
          <TouchableOpacity onPress={() => setFormData({ ...formData, showPassword: !formData.showPassword })}>
            <Text style={styles.showHideText}>{formData.showPassword ? 'Cacher' : 'Voir'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#666"
            secureTextEntry={!formData.showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          />
          <TouchableOpacity onPress={() => setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword })}>
            <Text style={styles.showHideText}>{formData.showConfirmPassword ? 'Cacher' : 'Voir'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          <LinearGradient
            colors={[COLORS.primary, '#9400D3']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>S'inscrire</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Déjà un compte? Se connecter</Text>
        </TouchableOpacity>
      </ScrollView>
      {showVerificationPopup && (
        <VerificationPopup 
          email={formData.email} 
          onVerify={handleVerificationPopupClose} 
        />
      )}
      {toast.visible && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast({ ...toast, visible: false })}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 40,
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
  },
  // Réutilisation des styles du LoginScreen pour la cohérence
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    color: '#fff',
    fontFamily: FONTS.medium,
  },
  orText: {
    color: '#666',
    marginVertical: 20,
    fontFamily: FONTS.medium,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    marginBottom: 15,
    fontFamily: FONTS.regular,
    borderWidth: 1,
    borderColor: '#333',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontFamily: FONTS.regular,
  },
  registerButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  loginText: {
    color: '#fff',
    fontFamily: FONTS.medium,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  errorText: {
    color: '#ff4444',
    marginTop: 10,
    fontFamily: FONTS.regular,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
});

export default RegisterScreen; 
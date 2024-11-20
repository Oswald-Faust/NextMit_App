import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import CustomToast from '../../components/CustomToast';

const LoginScreen = ({ navigation }) => {
  const { signIn, signInWithGoogle, signInWithFacebook } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error'
  });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = 'error') => {
    setToast({
      visible: true,
      message,
      type
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Veuillez remplir tous les champs');
      return;
    }

    if (!email.includes('@')) {
      showToast('Veuillez entrer un email valide');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      showToast('Connexion réussie !', 'success');
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }, 1000);
    } catch (error) {
      const errorMessage = 
        error.code === 'auth/user-not-found' 
          ? 'Aucun compte trouvé avec cet email'
          : error.code === 'auth/wrong-password'
          ? 'Mot de passe incorrect'
          : error.code === 'auth/invalid-email'
          ? 'Veuillez entrer un email valide'
          : 'Une erreur est survenue';
      
      showToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomToast 
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Image
        source={require('../../assets/eat.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Connexion</Text>

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

      <TextInput
        style={[
          styles.input,
          toast.visible && toast.message.includes('email') && styles.inputError
        ]}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            toast.visible && toast.message.includes('mot de passe') && styles.inputError
          ]}
          placeholder="Mot de passe"
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHideText}>{showPassword ? 'Cacher' : 'Voir'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
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
            <Text style={styles.loginText}>Connexion</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>S'inscrire</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 40,
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
  },
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
    backgroundColor: '#111',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    marginBottom: 15,
    fontFamily: FONTS.regular,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontFamily: FONTS.regular,
  },
  showHideText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  forgotPassword: {
    color: '#FF8C00',
    fontFamily: FONTS.medium,
    marginBottom: 30,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  registerText: {
    color: '#fff',
    fontFamily: FONTS.medium,
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
  inputError: {
    borderColor: '#FF453A',
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
  },
});

export default LoginScreen; 
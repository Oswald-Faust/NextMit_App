import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../constants/theme';
import { auth } from '../../config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VerificationScreen = ({ route, navigation }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const { verificationId, phoneNumber, email, userId, method } = route.params;

  console.log("Paramètres de vérification reçus:", {
    verificationId,
    phoneNumber,
    email,
    userId,
    method
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerification = async () => {
    try {
      if (phoneNumber) {
        const credential = auth.PhoneAuthProvider.credential(verificationId, code);
        await auth.currentUser.linkWithCredential(credential);
      } else {
        // Vérification email
        await auth.applyActionCode(code);
      }
      navigation.replace('Home');
    } catch (error) {
      setError('Code invalide. Veuillez réessayer.');
    }
  };

  const handleResendCode = async () => {
    try {
      if (phoneNumber) {
        await auth.verifyPhoneNumber(phoneNumber);
      } else {
        await auth.currentUser.sendEmailVerification();
      }
      setTimer(60);
    } catch (error) {
      setError('Erreur lors de l\'envoi du code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Vérification</Text>
      <Text style={styles.subtitle}>
        {phoneNumber 
          ? `Un code a été envoyé au ${phoneNumber}`
          : `Un code a été envoyé à ${email}`}
      </Text>

      <View style={styles.codeInputContainer}>
        <TextInput
          style={styles.codeInput}
          placeholder="Entrez le code"
          placeholderTextColor="#666"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={handleVerification}
      >
        <LinearGradient
          colors={[COLORS.primary, '#9400D3']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Vérifier</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.resendButton}
        onPress={handleResendCode}
        disabled={timer > 0}
      >
        <Text style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}>
          {timer > 0 ? `Renvoyer le code (${timer}s)` : 'Renvoyer le code'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  codeInput: {
    fontSize: 18,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    marginBottom: 20,
  },
  verifyButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  gradient: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  resendButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default VerificationScreen; 
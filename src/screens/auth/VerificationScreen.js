import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { applyActionCode } from 'firebase/auth';

const VerificationScreen = ({ route }) => {
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation();

  const handleVerification = async () => {
    try {
      await applyActionCode(auth, verificationCode);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Erreur vérification:', error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification de l'e-mail</Text>
      <Text style={styles.subtitle}>Un code de vérification a été envoyé à {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Code de vérification"
        onChangeText={setVerificationCode}
        value={verificationCode}
      />
      <Button title="Vérifier" onPress={handleVerification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default VerificationScreen; 
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const VerificationPopup = ({ email, onVerify }) => {
  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Text style={styles.title}>Vérification de l'e-mail</Text>
        <Text style={styles.subtitle}>Un e-mail de vérification a été envoyé à {email}. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour continuer.</Text>
        <Button title="J'ai vérifié mon e-mail" onPress={onVerify} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
});

export default VerificationPopup; 
import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SuccessPopup = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.primary, '#9400D3']}
          style={styles.popup}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="checkmark-circle" size={50} color="#fff" />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  }
});

export default SuccessPopup; 
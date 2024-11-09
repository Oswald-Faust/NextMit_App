import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NextButton({ scrollTo }) {
  return (
    <TouchableOpacity style={styles.button} onPress={scrollTo}>
      <Text style={styles.text}>Suivant</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
}); 
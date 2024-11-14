import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []); 

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/eat.png')}
        style={styles.eventchatLogo}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>Votre compagnon événementiel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventchatLogo: {
    width: 200,
    height: 80,
  },
  tagline: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontFamily: 'ClanPro-Book',
  }
});

export default SplashScreen; 
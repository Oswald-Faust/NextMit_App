import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { tempImages } from '../constants/tempImages';

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
        source={{ uri: tempImages.eventchatLogo }}
        style={styles.eventchatLogo}
        resizeMode="contain"
      />

      <Image
        source={{ uri: tempImages.eatDrinkLogo }}
        style={styles.eatDrinkLogo}
        resizeMode="contain"
      />

      <View style={styles.sponsorContainer}>
        <Image
          source={{ uri: tempImages.celtisLogo }}
          style={styles.celtisLogo}
          resizeMode="contain"
        />
        <Text style={styles.sponsorText}>Sponsor Officiel</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  eventchatLogo: {
    width: 150,
    height: 50,
    marginTop: 20,
  },
  eatDrinkLogo: {
    width: 200,
    height: 100,
  },
  sponsorContainer: {
    alignItems: 'center',
  },
  celtisLogo: {
    width: 120,
    height: 50,
  },
  sponsorText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000000',
  },
});

export default SplashScreen; 
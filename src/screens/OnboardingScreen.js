import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { FONTS, COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [fontsLoaded] = useFonts({
    'ClanPro-Bold': require('../assets/fonts/ClanPro-Bold.ttf'),
    'ClanPro-Medium': require('../assets/fonts/ClanPro-Medium.ttf'),
    'ClanPro-Book': require('../assets/fonts/ClanPro-Book.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/eat-and-drink-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          À l'origine il s'agissait d'une hypothèse de certains,{'\n'}
          selon laquelle le pur plaisir{'\n'}
          est atteint grâce à la{'\n'}
          combinaison de <Text style={styles.boldText}>4 éléments</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: width,
    height: height,
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${COLORS.primary}99`,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 180,
    height: 60,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 100,
    paddingHorizontal: 30,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: FONTS.regular,
  },
  boldText: {
    fontFamily: FONTS.bold,
  },
});

export default OnboardingScreen; 
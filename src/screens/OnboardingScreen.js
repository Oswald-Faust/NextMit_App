import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  const [fontsLoaded] = useFonts({
    'ClanPro-Bold': require('../assets/fonts/ClanPro-Bold.ttf'),
    'ClanPro-Medium': require('../assets/fonts/ClanPro-Medium.ttf'),
    'ClanPro-Book': require('../assets/fonts/ClanPro-Book.ttf'),
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNext = () => {
    navigation.replace('OnboardingElements');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image avec overlay */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../assets/violet.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/eat.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Contenu */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.description}>
          Bienvenue dans l'univers festif d'Event Chat! Explore les festivals comme jamais auparavant.
        </Text>
      </View>

      {/* Nouveau bouton Get Start */}
      <TouchableOpacity 
        style={styles.getStartButton} 
        onPress={handleNext}
      >
        <LinearGradient
          colors={['#8A2BE2', '#9400D3']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Get Start</Text>
          <View style={styles.arrowContainer}>
            <View style={styles.arrowCircle}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 150,
    height: 40,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 42,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: width - 60,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: 'white',
    fontSize: 20,
  }
});

export default OnboardingScreen; 
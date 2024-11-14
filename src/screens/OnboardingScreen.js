import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
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
          source={require('../assets/eat.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content avec animation */}
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <Text style={styles.text}>
          À l'origine il s'agissait d'une hypothèse de certains,{'\n'}
          selon laquelle le pur plaisir{'\n'}
          est atteint grâce à la{'\n'}
          combinaison de <Text style={styles.boldText}>4 éléments</Text>
        </Text>
      </Animated.View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Ionicons name="arrow-forward-circle" size={50} color="white" />
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
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  nextButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    padding: 10,
  },
});

export default OnboardingScreen; 
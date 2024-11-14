import React, { useState, useRef } from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    text: 'Vis l\'événement en direct. Partage tes réactions, tes émotions et connecte-toi avec la communauté festive.',
    highlight: 'En direct\nl\'événement',
    color: '#8A2BE2',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800'
  },
  {
    id: '2',
    text: 'Découvre les événements autour de toi et rejoins la communauté festive la plus proche.',
    highlight: 'Découvre\nprès de toi',
    color: '#FF4444',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'
  },
  {
    id: '3',
    text: 'Partage tes moments préférés et garde un souvenir de chaque instant festif.',
    highlight: 'Partage\ntes moments',
    color: '#1E90FF',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
  }
];

// Créer un composant FlatList animé
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const OnboardingElements = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true
    });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.backgroundImage}
      />
      <View style={[styles.overlay, { backgroundColor: `${item.color}99` }]} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.highlightText}>{item.highlight}</Text>
        <Text style={styles.description}>{item.text}</Text>
      </View>

      {renderBottomButtons()}
    </View>
  );

  const renderBottomButtons = () => {
    if (currentIndex === slides.length - 1) {
      return (
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.replace('Home')}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>

          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={() => navigation.replace('Home')}>
            <View style={styles.nextButton}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <View style={styles.nextButton}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: height * 0.25,
  },
  highlightText: {
    fontFamily: 'ClanPro-Bold',
    fontSize: 42,
    color: 'white',
    marginBottom: 20,
    textAlign: 'left',
  },
  description: {
    fontFamily: 'ClanPro-Book',
    fontSize: 18,
    color: 'white',
    lineHeight: 24,
    textAlign: 'left',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'ClanPro-Book',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#8A2BE2',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default OnboardingElements; 
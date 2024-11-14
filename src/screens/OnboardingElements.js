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
    text: 'Un grand repas ou une quantité énorme de nourriture ne peut se faire sans le',
    highlight: 'Bouffe!',
    color: '#FF4444',
    image: require('../assets/bouffe_now.png')
  },
  {
    id: '2',
    text: 'La boisson rafraîchit et fait partie intégrante de votre expérience',
    highlight: 'Bois!',
    color: '#1E90FF',
    image: require('../assets/bouffe_now.png')
  },
  {
    id: '3',
    text: 'De nouvelles découvertes gastronomiques à chaque coin',
    highlight: 'Explore!',
    color: '#FFA500',
    image: require('../assets/bouffe_now.png')
  }
];

// Créer un composant FlatList animé
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const OnboardingElements = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleMomentumScrollEnd = () => {
    if (currentIndex === slides.length - 1) {
      navigation.replace('Home');
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.slide, { width: width }]}>
        <Image
          source={item.image}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={[styles.overlay, { backgroundColor: `${item.color}CC` }]} />
        
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{item.text}</Text>
          <Text style={styles.highlightText}>{item.highlight}</Text>
        </View>
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
  
      {/* Indicateurs de pagination */}
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  opacity,
                  transform: [{ scale }]
                }
              ]}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  slide: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 0, 0, 0.85)',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '30%',
    width: '100%',
    paddingVertical: 20,
  },
  paginationDotContainer: {
    padding: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    paddingHorizontal: 30,
  },
  mainText: {
    fontFamily: 'ClanPro-Book',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    lineHeight: 32,
  },
  highlightText: {
    fontFamily: 'ClanPro-Bold',
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OnboardingElements; 
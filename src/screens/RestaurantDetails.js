import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const RestaurantDetails = ({ navigation }) => {
  const { navigateWithAuth } = useProtectedNavigation();

  const restaurant = {
    name: 'Makoumba',
    element: 'Element eau',
    logo: require('../assets/restaurants/mcdonalds.png'),
    cover: require('../assets/restaurants/restaurant-cover.png'),
    rating: 9.1,
    description: 'Millie Bobby Brown (Málaga, February 19, 2004) is a Spanish-born British actress. She started her acting career when she moved to Orlando, United States.',
    details: {
      knowFor: 'Performance',
      credited: '23',
      genre: 'Feminine',
      birth: '2004-02-19',
      birthPlace: 'Marbella',
      alsoKnownAs: 'Millie Brown'
    },
    gallery: [
      { id: '1', image: require('../assets/dishes/brochette.png') },
      { id: '2', image: require('../assets/dishes/brochette.png') },
      { id: '3', image: require('../assets/dishes/brochette.png') },
      { id: '4', image: require('../assets/dishes/brochette.png') },
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.coverContainer}>
          <Image source={restaurant.cover} style={styles.coverImage} />
          <LinearGradient
            colors={['transparent', '#000']}
            style={styles.gradient}
          />
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartButton}>
              <Ionicons name="heart-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={restaurant.logo} style={styles.logo} />
          </View>

          <View style={styles.mainInfo}>
            <View>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.elementText}>{restaurant.element}</Text>
            </View>
          </View>

          <Text style={styles.description}>{restaurant.description}</Text>

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons 
                key={star}
                name="star"
                size={20}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Know for:</Text>
              <Text style={styles.detailValue}>{restaurant.details.knowFor}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Birth:</Text>
              <Text style={styles.detailValue}>{restaurant.details.birth}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Credited in:</Text>
              <Text style={styles.detailValue}>{restaurant.details.credited}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Place of birth:</Text>
              <Text style={styles.detailValue}>{restaurant.details.birthPlace}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Genre:</Text>
              <Text style={styles.detailValue}>{restaurant.details.genre}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Also known as:</Text>
              <Text style={styles.detailValue}>{restaurant.details.alsoKnownAs}</Text>
            </View>
          </View>

          <View style={styles.gallery}>
            {restaurant.gallery.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.galleryItem}
                onPress={() => navigation.navigate('DishDetails', { dish: item })}
              >
                <Image source={item.image} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav 
        handleNavigation={navigateWithAuth}
        currentScreen="Home"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    height: 300,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mainInfo: {
    marginBottom: 20,
  },
  restaurantName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 5,
  },
  elementText: {
    color: '#666',
    fontSize: 16,
  },
  description: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  detailItem: {
    width: '50%',
    marginBottom: 15,
  },
  detailLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  galleryItem: {
    width: (width - 50) / 4,
    aspectRatio: 1,
    padding: 5,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    backgroundColor: '#000',
  },
  navItem: {
    padding: 8,
  },
});

export default RestaurantDetails;
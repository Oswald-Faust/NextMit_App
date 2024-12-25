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
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const EventsScreen = ({ navigation }) => {
  const { navigateWithAuth } = useProtectedNavigation();

  const elements = [
    { id: 'eau', name: 'Eau', icon: require('../assets/icons/eau.png') },
    { id: 'terre', name: 'Terre', icon: require('../assets/icons/terre.png') },
    { id: 'feu', name: 'Feu', icon: require('../assets/icons/feu.png') },
    { id: 'air', name: 'Air', icon: require('../assets/icons/air.png') },
  ];

  const dishes = [
    {
      id: '1',
      name: 'Saumon HARI',
      price: '5625',
      oldPrice: '7500',
      image: require('../assets/banners/banner2.png'),
      tag: 'n°1 vente',
    },
    {
      id: '2',
      name: 'Saumon HARI',
      price: '5625',
      oldPrice: '7500',
      image: require('../assets/banners/banner2.png'),
      tag: 'n°2 vente',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={require('../assets/eat-drink-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.userCount}>
            <Text style={styles.userCountText}>200 k</Text>
            <Ionicons name="people" size={16} color="#fff" />
          </View>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../assets/banners/banner1.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.bannerArrow}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Elements Grid */}
        <View style={styles.elementsGrid}>
          {elements.map((element) => (
            <TouchableOpacity 
              key={element.id}
              style={styles.elementCard}
              onPress={() => navigation.navigate('CategoryDetails', { element })}
            >
              <Image source={element.icon} style={styles.elementIcon} />
              <Text style={styles.elementName}>{element.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mets du moment */}
        <View style={styles.dishesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mets du moment</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryDetails')}>
              <Text style={styles.viewAllText}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dishesGrid}>
            {dishes.map((dish) => (
              <TouchableOpacity 
                key={dish.id}
                style={styles.dishCard}
                onPress={() => navigation.navigate('DishDetails', { dish })}
              >
                <Image source={dish.image} style={styles.dishImage} />
                {dish.tag && (
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{dish.tag}</Text>
                  </View>
                )}
                <View style={styles.dishInfo}>
                  <Text style={styles.dishName}>{dish.name}</Text>

                  <Text style={styles.dishCode}
                  >CODE BAR</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.oldPrice}>{dish.oldPrice}</Text>
                    <Text style={styles.price}>{dish.price} cfa</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav 
        handleNavigation={navigateWithAuth}
        currentScreen="Events"
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: {
    height: 30,
    width: 120,
  },
  userCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userCountText: {
    color: '#fff',
    marginRight: 6,
    fontSize: 14,
  },
  bannerContainer: {
    position: 'relative',
    marginTop: 10,
  },
  bannerImage: {
    width: width,
    height: 200,
  },
  bannerArrow: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  elementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  elementCard: {
    width: width * 0.2,
    aspectRatio: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
  elementName: {
    color: '#fff',
    fontSize: 12,
  },
  dishesSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#FF8C00',
    fontSize: 16,
  },
  dishesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dishCard: {
    width: width * 0.44,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  dishImage: {
    width: '100%',
    height: 120,
  },
  tagContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  dishInfo: {
    padding: 12,
  },
  dishName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dishCode: {
    color: '#666',
    fontSize: 12,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  price: {
    color: '#9ACD32',
    fontSize: 16,
    fontWeight: '600',
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

export default EventsScreen;
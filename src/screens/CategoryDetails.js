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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';
import BottomNav from '../components/BottomNav';

const CategoryDetails = ({ navigation }) => {
  const { navigateWithAuth } = useProtectedNavigation();

  const dishes = [
    {
      id: '1',
      title: 'BROCHETTE DE BOEUF',
      author: 'By Erik Eagleman',
      description: 'A cognitive approach inside the human brain by a Harvard locald mind salaf win dfn lof profess...',
      image: require('../assets/dishes/brochette.png'),
      participants: [
        { id: '1', avatar: require('../assets/avatars/avatar1.png') },
        { id: '2', avatar: require('../assets/avatars/avatar2.png') },
        { id: '3', avatar: require('../assets/avatars/avatar2.png') },
      ]
    },
    {
      id: '2',
      title: 'SALADE VEGAN',
      author: 'By Erik Eagleman',
      description: 'A cognitive approach inside the human brain by a Harvard locald mind salaf win dfn lof profess...',
      image: require('../assets/dishes/brochette.png'),
      participants: [
        { id: '1', avatar: require('../assets/avatars/avatar1.png') },
        { id: '2', avatar: require('../assets/avatars/avatar2.png') },
        { id: '3', avatar: require('../assets/avatars/avatar2.png') },
      ]
    },
    {
      id: '3',
      title: 'TARTE AU POMME',
      author: 'By Erik Eagleman',
      description: 'A cognitive approach inside the human brain by a Harvard locald mind salaf win dfn lof profess...',
      image: require('../assets/dishes/brochette.png'),
      participants: [
        { id: '1', avatar: require('../assets/avatars/avatar1.png') },
        { id: '2', avatar: require('../assets/avatars/avatar2.png') },
        { id: '3', avatar: require('../assets/avatars/avatar2.png') },
      ]
    },
    {
      id: '4',
      title: 'PIZZA JFO USA',
      author: 'By Erik Eagleman',
      description: 'A cognitive approach inside the human brain by a Harvard locald mind salaf win dfn lof profess...',
      image: require('../assets/dishes/brochette.png'),
      participants: [
        { id: '1', avatar: require('../assets/avatars/avatar1.png') },
        { id: '2', avatar: require('../assets/avatars/avatar2.png') },
        { id: '3', avatar: require('../assets/avatars/avatar2.png') },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mets du moment</Text>
      </View>

      <ScrollView style={styles.content}>
        {dishes.map((dish) => (
          <TouchableOpacity
            key={dish.id}
            style={styles.dishCard}
            onPress={() => navigation.navigate('DishDetails', { dish })}
          >
            <View style={styles.dishContent}>
              <Image source={dish.image} style={styles.dishImage} />
              <View style={styles.dishInfo}>
                <View style={styles.titleContainer}>
                  <Text style={styles.dishTitle}>{dish.title}</Text>
                  <Ionicons name="chevron-forward" size={24} color="#666" />
                </View>
                <Text style={styles.authorText}>{dish.author}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {dish.description}
                </Text>
                <View style={styles.participantsContainer}>
                  {dish.participants.map((participant, index) => (
                    <Image
                      key={participant.id}
                      source={participant.avatar}
                      style={[
                        styles.participantAvatar,
                        { marginLeft: index > 0 ? -15 : 0 }
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },
  dishContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  dishInfo: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  authorText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
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

export default CategoryDetails;
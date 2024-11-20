import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, COLORS } from '../constants/theme';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';

const BackgroundVideo = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Video
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        style={StyleSheet.absoluteFill}
        shouldPlay
        isLooping
        resizeMode="cover"
        isMuted={true}
        rate={1.0}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]} />
      )}
    </>
  );
};

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [showEvents, setShowEvents] = useState(false);
  const { navigateWithAuth } = useProtectedNavigation();

  const handleNavigation = (routeName) => {
    navigateWithAuth(routeName);
  };

  // Données temporaires pour les événements
  const hotEvents = [
    { id: '1', title: 'We Love Eya', viewers: 2302 },
    { id: '2', title: 'Cotonou Barbecue', viewers: 1205 },
    { id: '3', title: 'Festichill', viewers: 3506 },
  ];

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <View style={styles.viewersContainer}>
        <Ionicons name="eye-outline" size={16} color="#fff" />
        <Text style={styles.viewersText}>{item.viewers}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackgroundVideo />
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <Image
            source={require('../assets/eat.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => setShowEvents(!showEvents)}
          >
            <Ionicons name="flash" size={20} color="#fff" />
            <Text style={styles.exploreText}>Explorer</Text>
          </TouchableOpacity>
        </View>

        {showEvents && (
          <View style={styles.eventsContainer}>
            <FlatList
              data={hotEvents}
              renderItem={renderEventItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <View style={styles.chatContainer}>
          {/* Messages seront ajoutés plus tard */}
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.messageInput}
            onPress={handleNavigation}
          >
            <Text style={styles.placeholderText}>Écrire un message...</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleNavigation}
          >
            <Ionicons name="send" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Navigation du bas */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Events')}
          >
            <Ionicons name="pricetag-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Chat')}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Profile')}
          >
            <Ionicons name="person-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  logo: {
    width: 120,
    height: 30,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreText: {
    color: '#fff',
    marginLeft: 5,
    fontFamily: FONTS.medium,
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#fff',
    marginRight: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    padding: 10,
  },
  eventsContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 200,
  },
  eventTitle: {
    color: '#fff',
    fontFamily: FONTS.medium,
    flex: 1,
  },
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewersText: {
    color: '#fff',
    marginLeft: 5,
    fontFamily: FONTS.regular,
  },
  placeholderText: {
    color: '#666',
    fontFamily: FONTS.regular,
  }
});

export default HomeScreen; 
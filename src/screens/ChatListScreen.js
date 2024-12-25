import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';
import BottomNav from '../components/BottomNav';

const Chat = ({ navigation }) => {
  const { navigateWithAuth } = useProtectedNavigation();
  
  const conversations = [
    {
      id: '1',
      name: 'Diane SDM',
      lastMessage: 'Uploaded file.',
      time: 'Sam',
      unreadCount: 5,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2',
      name: 'Ben Le Frais',
      lastMessage: 'Tranquille merci bien bg 😊❤️',
      time: 'Mar',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '3',
      name: 'Corneille',
      lastMessage: 'Quoi de neuf?',
      time: 'Mer',
      unreadCount: 3,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '4',
      name: 'Joana Du Sal',
      lastMessage: 'jarek.kowal@emaile.com',
      time: '01 Fev',
      unreadCount: 22,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '5',
      name: 'Krysia Eurydyka',
      lastMessage: '😂',
      time: '18 Mar',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: '/placeholder.svg?height=40&width=40' }}
              style={styles.userAvatar}
            />
            <Text style={styles.userName}>MxxFxD</Text>
          </View>
          <Image
            source={require('../assets/eat-drink-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Feather name="search" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.locationSection}>
        <Text style={styles.locationTitle}>Votre Localisation</Text>
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: '/placeholder.svg?height=150&width=300' }}
            style={styles.map}
          />
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Partager à un ami</Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.conversationsList}>
        {conversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => navigation.navigate('ChatDetail', { conversation })}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: conversation.avatar }}
                style={styles.avatar}
              />
              {conversation.unreadCount && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>+{conversation.unreadCount}</Text>
                </View>
              )}
            </View>
            <View style={styles.conversationInfo}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.conversationTime}>{conversation.time}</Text>
              </View>
              <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav 
        handleNavigation={navigateWithAuth}
        currentScreen="Chat"
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
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logo: {
    height: 30,
    width: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    padding: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9ACD32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationSection: {
    padding: 16,
  },
  locationTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  map: {
    width: '100%',
    height: 150,
  },
  shareButton: {
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  conversationTime: {
    color: '#666',
    fontSize: 14,
  },
  lastMessage: {
    color: '#666',
    fontSize: 14,
  },
});

export default Chat;
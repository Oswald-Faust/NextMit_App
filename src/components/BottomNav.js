// src/components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const BottomNav = ({ handleNavigation, currentScreen }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleNavigation('Home')}
      >
        <Ionicons 
          name={currentScreen === 'Home' ? "home" : "home-outline"} 
          size={24} 
          color={currentScreen === 'Home' ? COLORS.primary : "#666"} 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('Events')}
      >
        <Ionicons 
          name={currentScreen === 'Events' ? "pricetag" : "pricetag-outline"} 
          size={24} 
          color={currentScreen === 'Events' ? COLORS.primary : "#666"} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleNavigation('Notifications')}
      >
        <Ionicons 
          name={currentScreen === 'Notifications' ? "notifications" : "notifications-outline"} 
          size={24} 
          color={currentScreen === 'Notifications' ? COLORS.primary : "#666"} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleNavigation('Chat')}
      >
        <Ionicons 
          name={currentScreen === 'Chat' ? "chatbubble" : "chatbubble-outline"} 
          size={24} 
          color={currentScreen === 'Chat' ? COLORS.primary : "#666"} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => handleNavigation('Profile')}
      >
        <Ionicons 
          name={currentScreen === 'Profile' ? "person" : "person-outline"} 
          size={24} 
          color={currentScreen === 'Profile' ? COLORS.primary : "#666"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
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
};

export default BottomNav;
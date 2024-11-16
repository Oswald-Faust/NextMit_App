import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../constants/theme';

const BottomNav = ({ navigation, activeRoute }) => {
  const { user } = useContext(AuthContext);

  const handleNavigation = (route) => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate(route);
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      {user ? (
        <>
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
        </>
      ) : (
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-in-outline" size={24} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BottomNav; 
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, COLORS } from '../constants/theme';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Événements</Text>
        {user ? (
          <TouchableOpacity 
            onPress={handleLogout}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Déconnexion</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Connexion</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          {/* Ajout des catégories d'événements ici */}
        </View>

        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>À venir</Text>
          {/* Liste des événements à venir */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: COLORS.secondary,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
  },
  upcomingContainer: {
    flex: 1,
  },
  loginButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  loginText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 14,
  }
});

export default HomeScreen; 
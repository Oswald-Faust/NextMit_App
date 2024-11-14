import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, COLORS } from '../constants/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Événements</Text>
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
    height: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
});

export default HomeScreen; 
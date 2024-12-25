import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { ProtectedButton } from '../components/ProtectedButton';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';
import BottomNav from '../components/BottomNav';

const EventScreen = () => {
  const { navigateWithAuth } = useProtectedNavigation();

  const handleParticipate = () => {
    navigateWithAuth('EventDetails', { action: 'participate' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProtectedButton onAction={handleParticipate}>
        <Text>Participer à l'événement</Text>
      </ProtectedButton>

      <TouchableOpacity
        onPress={() => navigateWithAuth('Comments')}
      >
        <Text>Voir les commentaires</Text>
      </TouchableOpacity>

      <BottomNav 
        handleNavigation={navigateWithAuth}
        currentScreen="Events"
      />
    </SafeAreaView>
  );
};

export default EventScreen; 
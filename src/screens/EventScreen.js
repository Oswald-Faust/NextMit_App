import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ProtectedButton } from '../components/ProtectedButton';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';

const EventScreen = () => {
  const { navigateWithAuth } = useProtectedNavigation();

  const handleParticipate = () => {
    navigateWithAuth('EventDetails', { action: 'participate' });
  };

  return (
    <View>
      <ProtectedButton onAction={handleParticipate}>
        <Text>Participer à l'événement</Text>
      </ProtectedButton>

      <TouchableOpacity
        onPress={() => navigateWithAuth('Comments')}
      >
        <Text>Voir les commentaires</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventScreen; 
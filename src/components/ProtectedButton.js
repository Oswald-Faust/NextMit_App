import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useProtectedNavigation } from '../hooks/useProtectedNavigation';

export const ProtectedButton = ({ onAction, children, style }) => {
  const { navigateWithAuth } = useProtectedNavigation();

  const handlePress = () => {
    if (navigateWithAuth('Login')) {
      onAction && onAction();
    }
  };

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
}; 
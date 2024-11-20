import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const useProtectedNavigation = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const navigateWithAuth = (routeName, params) => {
    if (!user) {
      navigation.navigate('Login');
      return false;
    }
    navigation.navigate(routeName, params);
    return true;
  };

  return { navigateWithAuth };
}; 
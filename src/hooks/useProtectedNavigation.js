import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export const useProtectedNavigation = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  const publicScreens = [];

  const navigateWithAuth = (routeName, params = {}) => {
    if (publicScreens.includes(routeName) || isAuthenticated) {
      navigation.navigate(routeName, params);
    } else {
     navigation.navigate('Login');
    }
  };

  return { navigateWithAuth };
}; 
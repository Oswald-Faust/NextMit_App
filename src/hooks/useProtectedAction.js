import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const useProtectedAction = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const executeProtectedAction = (action) => {
    if (!user) {
      navigation.navigate('Login');
      return false;
    }
    return action();
  };

  return { executeProtectedAction };
};
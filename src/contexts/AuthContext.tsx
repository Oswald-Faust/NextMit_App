import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/api.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  user: any;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: async (credentials: { email: string; password: string }) => {},
  signUp: async (userData : any) => {},
  signOut: async () => {},
  loading: false
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiService.login(credentials.email, credentials.password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUser(JSON.parse(atob(token.split('.')[1])));
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};
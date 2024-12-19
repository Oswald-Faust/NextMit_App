import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/api.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  user: any;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiService.login(credentials.email, credentials.password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (userData: any) => {
    try {
      const response = await apiService.register(userData);
      setUser(response.user);
    } catch (error) {
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

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
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
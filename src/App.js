import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'ClanPro-Bold': require('./assets/fonts/ClanPro-Bold.ttf'),
    'ClanPro-Medium': require('./assets/fonts/ClanPro-Medium.ttf'),
    'ClanPro-Book': require('./assets/fonts/ClanPro-Book.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
          <AppNavigator />
    </AuthProvider>
  );
} 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingElements from '../screens/OnboardingElements';
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
import EventsScreen from '../screens/EventsScreen';
import CategoryDetails from '../screens/CategoryDetails';
import RestaurantDetails from '../screens/RestaurantDetails';
import DishDetails from '../screens/DishDetails';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatDetailScreen from '../screens/ChatDetail';
import ChatListScreen from '@/screens/ChatListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingElements" component={OnboardingElements} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
        <Stack.Screen name="DishDetails" component={DishDetails} />
        <Stack.Screen name="Chat" component={ChatListScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
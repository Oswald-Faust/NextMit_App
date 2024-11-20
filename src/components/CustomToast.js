import React, { useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomToast = ({ message, type = 'error', visible, onHide }) => {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10
        }),
        Animated.delay(3000),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => onHide());
    }
  }, [visible]);

  const getToastStyle = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: 'rgba(255, 69, 58, 0.95)',
          icon: 'alert-circle'
        };
      case 'success':
        return {
          backgroundColor: 'rgba(48, 209, 88, 0.95)',
          icon: 'checkmark-circle'
        };
      default:
        return {
          backgroundColor: 'rgba(142, 142, 147, 0.95)',
          icon: 'information-circle'
        };
    }
  };

  const toastStyle = getToastStyle();

  return visible ? (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY }], backgroundColor: toastStyle.backgroundColor }
      ]}
    >
      <Ionicons name={toastStyle.icon} size={24} color="#fff" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});

export default CustomToast; 
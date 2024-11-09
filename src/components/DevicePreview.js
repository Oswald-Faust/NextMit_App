import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export const DevicePreview = ({ children }) => {
  if (Platform.OS !== 'web') return children;

  return (
    <div style={styles.container}>
      {/* iPhone 13 Pro Max */} 
      <div style={styles.deviceWrapper}>
        <div style={styles.deviceiPhone}>
          <div style={styles.deviceContent}>
            {children}
          </div>
        </div>
        <p style={styles.deviceLabel}>iPhone 13 Pro Max</p>
      </div>

      {/* Pixel 6 */}
      <div style={styles.deviceWrapper}>
        <div style={styles.deviceAndroid}>
          <div style={styles.deviceContent}>
            {children}
          </div>
        </div>
        <p style={styles.deviceLabel}>Pixel 6</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  deviceWrapper: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  deviceiPhone: {
    width: 428,
    height: 926,
    backgroundColor: 'white',
    borderRadius: 50,
    border: '12px solid #000',
    overflow: 'hidden',
    position: 'relative',
  },
  deviceAndroid: {
    width: 393,
    height: 851,
    backgroundColor: 'white',
    borderRadius: 30,
    border: '10px solid #000',
    overflow: 'hidden',
    position: 'relative',
  },
  deviceContent: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  deviceLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
};

export default DevicePreview; 
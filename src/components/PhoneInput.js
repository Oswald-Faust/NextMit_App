import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CountryPicker, { 
  CountryModalProvider,
  DARK_THEME
} from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';

const PhoneInput = ({ 
  value = '', 
  onChangeText = () => {}, 
  error = false 
}) => {
  const [countryCode, setCountryCode] = useState('BJ');
  const [callingCode, setCallingCode] = useState('229');
  const [showPicker, setShowPicker] = useState(false);

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    onChangeText(value.replace(/^\+\d+/, `+${country.callingCode[0]}`));
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <CountryModalProvider>
        <TouchableOpacity 
          style={[styles.countrySelector, error && styles.errorBorder]} 
          onPress={() => setShowPicker(true)}
        >
          <CountryPicker
            withFilter
            withFlag
            withCallingCode
            withCallingCodeButton
            countryCode={countryCode}
            visible={showPicker}
            onSelect={onSelectCountry}
            onClose={() => setShowPicker(false)}
            containerButtonStyle={styles.countryPickerButton}
            theme={DARK_THEME}
          />
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </CountryModalProvider>

      <TextInput
        style={[styles.input, error && styles.errorBorder]}
        value={value.replace(`+${callingCode}`, '')}
        onChangeText={(text) => {
          const cleaned = text.replace(/\D/g, '');
          onChangeText(`+${callingCode}${cleaned}`);
        }}
        keyboardType="phone-pad"
        placeholder="Numéro de téléphone"
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countrySelector: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  countryPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorBorder: {
    borderColor: '#FF453A',
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
  },
});

export default PhoneInput;
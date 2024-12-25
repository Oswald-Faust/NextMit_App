import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DishDetails = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);

  const dish = {
    name: 'SALADE VEGAN',
    price: 5000.00,
    image: require('../assets/dishes/brochette.png'),
    description: 'Perfect loveseat, sofa and home theater set for your home. Art object that fit your style. Great quality customizable recliners with easy-action recline. Fine leathers and fabrics.',
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <Image source={dish.image} style={styles.dishImage} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>Chair</Text>
          </View>
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.price}>CFA {dish.price.toFixed(2)}</Text>
          <Text style={styles.description}>{dish.description}</Text>
          <Text style={styles.paymentTitle}>Choisir moyen de paiement</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity style={styles.paymentOption}>
              <Ionicons name="qr-code-outline" size={24} color="#000" />
              <Text style={styles.paymentOptionText}>Scan</Text>
              <Text style={styles.paymentOptionSubtext}>C'Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
              <Ionicons name="wallet-outline" size={24} color="#000" />
              <Text style={styles.paymentOptionText}>Portefeuille</Text>
              <Text style={styles.paymentOptionSubtext}>Direct</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Ionicons name="remove" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  dishImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  categoryTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryText: {
    color: '#000',
    fontSize: 14,
  },
  dishName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    color: '#9ACD32',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: '#999',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  paymentTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '48%',
  },
  paymentOptionText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  paymentOptionSubtext: {
    color: '#666',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: '#9ACD32',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DishDetails;
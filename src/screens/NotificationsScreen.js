import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { FONTS, COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const NotificationsScreen = ({ navigation }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = new Animated.Value(height);

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedNotification(null);
    });
  };

  const renderNotificationModal = () => (
    <Modal
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.modalHeader}>
            <View style={styles.userImageContainer}>
              <Image 
                source={selectedNotification?.image} 
                style={styles.modalUserImage}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
            <Text style={styles.modalStatus}>Enligne</Text>
          </View>

          <Text style={styles.modalMessage}>
            Aimerais être en contact avec vous
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.refuseButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.refuseButtonText}>Refuser</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={() => {
                handleCloseModal();
              }}
            >
              <Text style={styles.acceptButtonText}>Accepter</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  const notifications = [
    {
      id: '1',
      title: 'QUEENIE',
      chapter: 'Chapter 14',
      description: 'Queenie Jenkins is a 25-year-old Jamaican British woman living in London, straddling two cultures and slotting neatly into neither. She works at a nation...',
      image: require('../assets/notifications/notification1.png'),
      hasAction: false
    },
    {
      id: '2',
      title: 'RED, WHITE & ROYAL BLUE',
      chapter: 'Chapter 4',
      description: 'First Son Alex Claremont-Diaz is the closest thing to a prince this side of the Atlantic. With his intrepid sister and the Veep..',
      image: require('../assets/notifications/notification1.png'),
      hasAction: true
    },
    // Ajoutez d'autres notifications
  ];

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
    >
      <Image source={item.image} style={styles.notificationImage} />
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.chapterText}>{item.chapter}</Text>
        </View>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {item.description}
        </Text>
        {item.hasAction && (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Afficher</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {renderNotificationModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  notificationsList: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  chapterText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#999',
    lineHeight: 20,
  },
  actionButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#4CAF50',
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
    height: height * 0.45,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  modalUserImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#000',
    marginBottom: 5,
  },
  modalStatus: {
    fontSize: 16,
    color: '#4CAF50',
  },
  modalMessage: {
    fontSize: 18,
    color: '#666',
    marginVertical: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  refuseButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '45%',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refuseButtonText: {
    color: '#666',
    fontSize: 16,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
    marginRight: 5,
  },
});

export default NotificationsScreen;
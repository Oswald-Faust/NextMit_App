import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const ChatDetail = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  
  const participants = [
    { id: '1', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '2', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '3', avatar: '/placeholder.svg?height=40&width=40', active: true },
    { id: '4', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '5', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '6', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '7', avatar: '/placeholder.svg?height=40&width=40' },
  ];

  const messages = [
    {
      id: '1',
      text: 'Salut checo , comment ta journée? 👑',
      timestamp: '3 MAR 13:34',
      type: 'system',
    },
    {
      id: '2',
      text: 'Au bureau, 3 personnes sont infectées. Nous travaillons à domicile.',
      type: 'received',
    },
    {
      id: '3',
      text: 'Tout va bien ici. Nous nous lavons les mains et restons à la maison.',
      type: 'received',
    },
    {
      id: '4',
      image: '/placeholder.svg?height=200&width=200',
      type: 'received',
    },
    {
      id: '5',
      text: "C'est notre nouveau manager voilà sa photo.",
      type: 'received',
    },
    {
      id: '6',
      text: '2 messages non lues',
      type: 'system',
      isUnread: true,
    },
    {
      id: '7',
      text: 'Salut mon amour',
      type: 'received',
      avatar: '/placeholder.svg?height=30&width=30',
    },
    {
      id: '8',
      text: 'Ah c\'est cool ✌️✌️',
      type: 'received',
      avatar: '/placeholder.svg?height=30&width=30',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.participants}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {participants.map((participant) => (
            <View
              key={participant.id}
              style={[
                styles.participantAvatar,
                participant.active && styles.activeParticipant,
              ]}
            >
              <Image
                source={{ uri: participant.avatar }}
                style={styles.avatar}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <View key={msg.id} style={styles.systemMessage}>
                <Text style={[
                  styles.systemMessageText,
                  msg.isUnread && styles.unreadSystemMessage
                ]}>
                  {msg.text}
                </Text>
                {msg.timestamp && (
                  <Text style={styles.timestamp}>{msg.timestamp}</Text>
                )}
              </View>
            );
          }

          return (
            <View key={msg.id} style={styles.messageContainer}>
              {msg.avatar && (
                <Image source={{ uri: msg.avatar }} style={styles.messageAvatar} />
              )}
              <View style={[styles.message, styles.receivedMessage]}>
                {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                {msg.image && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: msg.image }} style={styles.messageImage} />
                    <View style={styles.imageActions}>
                      <TouchableOpacity style={styles.imageAction}>
                        <Feather name="x" size={20} color="#FF8C00" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.imageAction}>
                        <Feather name="download" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Write"
            placeholderTextColor="#666"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Feather name="send" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Feather name="camera" size={20} color="#fff" />
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
  header: {
    padding: 16,
  },
  participants: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  participantAvatar: {
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#333',
  },
  activeParticipant: {
    borderColor: '#FF8C00',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  systemMessage: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemMessageText: {
    color: '#666',
    fontSize: 14,
  },
  unreadSystemMessage: {
    color: '#FF8C00',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  message: {
    maxWidth: '80%',
    borderRadius: 20,
    padding: 12,
  },
  receivedMessage: {
    backgroundColor: '#1A1A1A',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  imageActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
  },
  imageAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9ACD32',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatDetail;
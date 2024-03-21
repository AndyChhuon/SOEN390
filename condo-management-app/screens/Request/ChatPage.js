import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import {useNavigation, useRoute } from '@react-navigation/native';

const ChatPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { assigneeName, initialMessage } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const screenHeight = Dimensions.get('window').height;

  
//FETCHING OF MESSAGES 
  useEffect(() => {
    if (initialMessage) {
      setMessages([{ id: 1, text: initialMessage, sender: 'user' }]);
    }
  }, [initialMessage]);


  //SEND MESSAGE FUNCTION
  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { id: messages.length, text: inputMessage, sender: 'user' }]);
    setInputMessage('');
  };

  //END CHAT BUTTON
  const handleEndChat = () => {
    navigation.goBack('Request');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.assigneeName}>{assigneeName}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              {
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: '#BFBFBF', 
              },
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.endChatButton} onPress={handleEndChat}>
        <Text style={styles.endChatButtonText}>End Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor2,
    margin: 10,
    borderRadius: 10,
    padding: 20, 
  },
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 10,
  },
  assigneeName: {
    fontSize: 18,
    fontWeight: 'bold',
    ...Fonts.whiteColor16Medium,
  },
  chatContainer: {
    flexGrow: 1,
    paddingBottom: 10, 
  }, // Add a closing bracket here
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
    ...Fonts.whiteColor16Medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingVertical: 10, 
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    marginRight: 5,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  endChatButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  endChatButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 




export default ChatPage;

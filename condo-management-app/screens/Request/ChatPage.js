import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
} from "react-native";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { set } from "firebase/database";

const ChatPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { assigneeName, initialMessage, assigneeImage } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const screenHeight = Dimensions.get("window").height;

  const { generateChatResponse } = useAuth();

  //FETCHING OF MESSAGES
  useEffect(() => {
    if (initialMessage) {
      setMessages([{ content: initialMessage, role: "user" }]);
      generateChatResponse(
        [{ content: initialMessage, role: "user" }],
        setMessages
      );
    }
  }, [initialMessage]);

  //SEND MESSAGE FUNCTION
  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages([...messages, { content: inputMessage, role: "user" }]);
    generateChatResponse(
      [...messages, { content: inputMessage, role: "user" }],
      setMessages
    );
    setInputMessage("");
  };

  //END CHAT BUTTON
  const handleEndChat = () => {
    navigation.goBack("Request");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {Platform.OS === "ios" || Platform.OS === "android" ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <View style={styles.header}>
                  {assigneeImage && (
                    <Image source={assigneeImage} style={styles.assigneeImage} />
                  )}
                  <Text style={styles.assigneeName}>{assigneeName}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.chatContainer}>
                  {messages.map((message, index) => (
                    <View
                      key={index}
                      style={[
                        styles.messageBubble,
                        {
                          alignSelf:
                            message.role === "user" ? "flex-end" : "flex-start",
                          backgroundColor: "#BFBFBF",
                        },
                      ]}
                    >
                      <Text style={styles.messageText}>{message.content}</Text>
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
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.container}>
            <View style={styles.header}>
              {assigneeImage && (
                <Image source={assigneeImage} style={styles.assigneeImage} />
              )}
              <Text style={styles.assigneeName}>{assigneeName}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.chatContainer}>
              {messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    {
                      alignSelf:
                        message.role === "user" ? "flex-end" : "flex-start",
                      backgroundColor: "#BFBFBF",
                    },
                  ]}
                >
                  <Text style={styles.messageText}>{message.content}</Text>
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bodyBackColor2,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    marginBottom: 10,
  },
  assigneeName: {
    fontSize: 18,
    fontWeight: "bold",
    ...Fonts.whiteColor16Medium,
    marginLeft: 10,
  },
  assigneeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
    ...Fonts.whiteColor16Medium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 30,
    marginHorizontal: 5,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    marginRight: 5,
  },
  sendButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  endChatButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  endChatButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatPage;

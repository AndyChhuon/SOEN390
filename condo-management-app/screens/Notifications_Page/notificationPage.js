import React, { useRef, useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
import useAuth from "../../hooks/useAuth";

import {
 SafeAreaView,
 View,
 Image,
 Keyboard,
 Dimensions,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 KeyboardAvoidingView,
 TouchableWithoutFeedback,
 Platform,
 ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { FlatList } from "react-native-gesture-handler";
import NotificationComponent from "../Components/NotificationComponent"; // Make sure the path is correct

const notifications = [
 {
  id: "1",
  message: "Your order has been shipped",
  timestamp: "10 minutes ago",
 },
 { id: "2", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "3", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "4", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "5", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "6", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "7", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "8", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "9", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 { id: "10", message: "New message from Jane Doe", timestamp: "2 hours ago" },
 // Add more notifications as needed
];

const NotificationPage = () => {
 const { userValues } = useAuth();
 const [state, setState] = useState({
  firstName: userValues.firstName,
  lastName: userValues.lastName,
 });
 const styles = createStyles(height);

 const [windowDimensions, setWindowDimensions] = useState(
  Dimensions.get("window")
 );
 const { width, height } = windowDimensions;

const DeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    // Update the state with the updated notifications
    setState((prevState) => ({
        ...prevState,
        notifications: updatedNotifications,
    }));
};

const [notifs, setNotifs] = useState(notifications);

  // Delete function that uses setNotifications
  const deleteNotification = (id) => {
    setNotifs(currentNotifications => 
      currentNotifications.filter(notification => notification.id !== id)
    );
  };

  const { addNotification } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  const addNewNotification = () => {
    if (newMessage.trim().length === 0) {
        // Optionally handle the empty message case, such as displaying an error message
        alert("Please enter a message for the notification.");
        return;
    }
    const newNotification = {
        id: (Math.max(...notifs.map(n => parseInt(n.id)), 0) + 1).toString(),  // Generate a new ID
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
    };
    addNotification(newMessage);
    setNotifs(currentNotifications => [...currentNotifications, newNotification]);

    setNewMessage(''); // Clear the input after adding
};



 useEffect(() => {
  const onChange = ({ window }) => {
   setWindowDimensions(window);
  };

  Dimensions.addEventListener("change", onChange);
  return () => Dimensions.removeEventListener("change", onChange);
 }, []);

 const handlePressOutsideTextBox = () => {
  Keyboard.dismiss();
 };

 const content = (
  <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
   <ScrollView contentContainerStyle={{ flexGrow: 1, height: height * 0.92 }}>
    <KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? "padding" : undefined}
     style={{ flex: 1, justifyContent: "center" }}
    >
     <View
      style={{
       alignSelf: "center",
       flex: 1,
       flexDirection: "column",
       alignContent: "center",
       width: width * 0.95,
       height: height,
       padding: 10,
       marginVertical: "5%",
      }}
     >
      {Title()}
      {AddNotificationForm()}
      {NotificationList()}
     </View>
    </KeyboardAvoidingView>
   </ScrollView>
  </SafeAreaView>
 );

 function Title() {
  return (
   <View>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
     <View
      style={{
       flex: 1,
       justifyContent: "flex-end",
       height: 75,
       alignItems: "flex-start",
      }}
     >
      <Text style={[{ ...Fonts.whiteColor26SemiBold }]}>Notifications</Text>
      <Text style={{ ...Fonts.whiteColor14Medium }}>
       {"You have notifications"} {state.firstName}
      </Text>
     </View>
    </View>
   </View>
  );
 }

 function NotificationList() {
  return (
   <View style={{marginVertical: 50}}>
    <FlatList
     data={notifs}
     keyExtractor={(item) => item.id}
     renderItem={({ item }) => (
      <NotificationComponent
       message={item.message}
       timestamp={item.timestamp}
       onDelete={() => deleteNotification(item.id)}
      />
     )}
    />
   </View>
  );
 }

 function AddNotificationForm() {
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                style={styles.input}
                onChangeText={setNewMessage}
                value={newMessage}
                placeholder="Enter new notification message"
                placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={addNewNotification} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Notification</Text>
            </TouchableOpacity>
        </View>
    );
}


 if (Platform.OS === "web") {
  return content;
 } else {
  return (
   <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
     {content}
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
 }
};

export default NotificationPage;

function createStyles(height) {
 return StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   height: height,
   padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
},
addButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
},
addButtonText: {
    color: 'white',
    fontSize: 16,
},
 });
}

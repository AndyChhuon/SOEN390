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


    const [notifs, setNotifs] = useState([]);


    // Delete function that uses setNotifications
    const deleteNotification = (id) => {
        setNotifs(currentNotifications =>
            currentNotifications.filter(notification => notification.id !== id)
        );
    };

    const handleToggleReadStatus = (id, currentStatus) => {
        // Optimistically update the local state
        setNotifs((currentNotifications) =>
            currentNotifications.map((notif) =>
                notif.id === id ? { ...notif, read: !notif.read } : notif
            )
        );
        // Call the function from useAuth
        updateNotificationReadStatus(userValues.userId, id, !currentStatus);
    };



    const { addNotification, retrieveNotifications, updateNotificationReadStatus } = useAuth();
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
            read: true,
        };
        addNotification(newMessage);
        setNotifs(currentNotifications => [newNotification, ...currentNotifications]);

        setNewMessage(''); // Clear the input after adding
    };

    const convertTimestamp = (timestamp) => {
        // Assuming the timestamp is in milliseconds
        return new Date(timestamp).toLocaleString(); // Adjust the string format as needed
    };


    const retrieveAllNotifications = async () => {
        try {
            const fetchedNotifications = await retrieveNotifications();
            if (fetchedNotifications && typeof fetchedNotifications === 'object') {
                let notificationsArray = Object.keys(fetchedNotifications).map(key => ({
                    id: key,
                    ...fetchedNotifications[key],
                    timestamp: convertTimestamp(fetchedNotifications[key].timestamp),
                }));

                // Sort by timestamp in descending order
                notificationsArray = notificationsArray.sort((a, b) => b.timestamp - a.timestamp);

                setNotifs(notificationsArray);
            } else {
                console.log('No notifications received');
            }
        } catch (error) {
            console.error('Error retrieving notifications:', error);
        }
    };


    useEffect(() => {
        const onChange = ({ window }) => {
            setWindowDimensions(window);
        };

        Dimensions.addEventListener("change", onChange);
        return () => Dimensions.removeEventListener("change", onChange);
    }, []);


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(userValues); // See what's inside userValues

        setIsLoading(true);
        retrieveAllNotifications().then(() => setIsLoading(false)).catch(err => {
            setError('Failed to load notifications');
            setIsLoading(false);
        });
    }, []);


    // onload retrieve all notifications
    useEffect(() => {
        retrieveAllNotifications();
    }, []);



    const handlePressOutsideTextBox = () => {
        Keyboard.dismiss();
    };

    if (isLoading) return <Text>Loading notifications...</Text>;
    if (error) return <Text>{error}</Text>;

    const countUnreadNotifications = (notifications) => {
        return notifications.filter(notification => notification.read).length;
    };

    const unreadCount = countUnreadNotifications(notifs);


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
                        {/* {AddNotificationForm()} */}
                        {NotificationList()}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );

    function Title() {
        const notificationMessage = unreadCount === 0
            ? "No new notifications"
            : `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`;

        return (
            <View>
                
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={{
                        uri: `https://eu.ui-avatars.com/api/?name=${state.firstName[0]}+${state.lastName[0]}`,
                    }}
                    style={{ width: 75, height: 75, borderRadius: 50, margin: 10 }}
                />
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
                            {notificationMessage} {state.firstName}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    function NotificationList() {
        return (
            <View style={{ marginVertical: 50 }}>
                <FlatList
                    data={notifs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationComponent
                            message={item.message}
                            timestamp={item.timestamp}
                            read={item.read}
                            onToggleReadStatus={() => handleToggleReadStatus(item.id, item.read)}
                        // onDelete={() => deleteNotification(item.id)}
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

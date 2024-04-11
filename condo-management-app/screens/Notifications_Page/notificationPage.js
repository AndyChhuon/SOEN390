import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Dimensions // If you use 'height' from Dimensions
} from 'react-native';
import NotificationComponent from '../Components/NotificationComponent'; // Make sure the path is correct

import { Colors } from '../../constants/styles';

const notifications = [
    { id: '1', message: 'Your order has been shipped', timestamp: '10 minutes ago' },
    { id: '2', message: 'New message from Jane Doe', timestamp: '2 hours ago' },
    // Add more notifications as needed
];

const NotificationPage = () => {

    const { height } = Dimensions.get('window');
    const styles = createStyles(height); // Ensure this is uncommented and used if you are using dynamic styles based on height

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

                    
                        <View style={styles.container}>
                            <FlatList
                                data={notifications}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <NotificationComponent message={item.message} timestamp={item.timestamp} />}
                            />
                        </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );


    if (Platform.OS === "web") {
        return content;
    } else {
        return (
            <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}
                >
                    {content}
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
};


export default NotificationPage;

function createStyles(height) {
    return StyleSheet.create({
        notificationContainer: {
            flex: 1,
            backgroundColor: "#333", // Light background for better readability
        },

        notificationItem: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#b0b0b0", // Slightly grey background for notification items
            borderRadius: 10,
            padding: 10,
            marginVertical: 5,
            marginHorizontal: 10,
        },

        notificationText: {
            fontSize: 16,
            color: "#333",
            flex: 1, // Allows text to wrap and take up most of the container space
        },

        timestamp: {
            fontSize: 12,
            color: "#666",
            marginLeft: 10, // Adds spacing between the message and timestamp
        },

        markAllAsReadButton: {
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 10,
            padding: 10,
            backgroundColor: "blue", // A visually distinct button
            borderRadius: 5,
            alignItems: "center",
        },

        buttonText: {
            color: "#ffffff",
            fontSize: 16,
        },

        // If there are specific styles for icons, labels, or dropdowns in your notification components, adjust them here.
        iconStyle: {
            width: 20,
            height: 20,
        },
        label: {
            fontSize: 14,
            backgroundColor: "transparent", // Assuming labels might be used for categorizing notifications
            paddingHorizontal: 8,
        },
        // Additional styles for dropdown or selection components within notifications, if needed
        dropdown: {
            height: 40,
            borderColor: "gray",
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginHorizontal: 10, // Ensures consistent horizontal padding with other items
        },
    });
}

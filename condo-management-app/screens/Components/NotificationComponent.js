import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";

const NotificationComponent = ({ message, timestamp, read, onToggleReadStatus }) => {
  const notificationStyle = read ? styles.notificationRead : styles.notificationUnread;

  return (
    <View style={[styles.notificationContainer, notificationStyle]}>
      <Text style={styles.notificationMessage}>{message}</Text>
      <Text style={styles.notificationTimestamp}>{timestamp}</Text>
      <TouchableOpacity onPress={onToggleReadStatus} style={styles.toggleStatusButton}>
        <Text style={styles.toggleStatusButtonText}>{read ? 'Mark as Read' : 'Mark as Unread'}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationMessage: {
    flex: 0.75,
    fontSize: 16,
    color: '#333',
    ...Fonts.BlackColor16Regular,
  },
  notificationTimestamp: {
    flex: 0.15,
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
  notificationUnread: {
    // Styling for read notifications
    backgroundColor: '#A0B0C0', // a light gray, or any color that indicates it's read
  },
  notificationRead: {
    // Styling for unread notifications
    backgroundColor: '#DFEFFF', // white, or any color that indicates it's unread
  },
  toggleStatusButton: {
    flex: 0.1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
    textAlign: 'center',
    //alignSelf: 'flex-start',
  },
  toggleStatusButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NotificationComponent;

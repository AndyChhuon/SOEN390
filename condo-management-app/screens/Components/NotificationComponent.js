import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationComponent = ({ message, timestamp, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
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
});

export default NotificationComponent;

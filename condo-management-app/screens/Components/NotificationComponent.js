import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationComponent = ({ message, timestamp }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default NotificationComponent;

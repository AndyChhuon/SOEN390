import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from "../../constants/styles";

const EmployeeComponent = ({ employee, onEdit, onDelete }) => {
  return (
    <View style={styles.employeeContainer}>
      <Text style={styles.employeeID}>{employee.id}</Text>
      <Text style={styles.employeeName}>{`${employee.firstname} ${employee.lastname}`}</Text>
      <Text style={styles.employeeRole}>{employee.role}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onEdit(employee.id)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(employee.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  employeeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  employeeID: {
    flex: 0.5,
    fontSize: 14,
    color: '#333',
    ...Fonts.BlackColor16Regular,
  },
  employeeName: {
    flex: 0.5,
    fontSize: 14,
    color: '#333',
    ...Fonts.BlackColor16Regular,
  },
  employeeRole: {
    flex: 0.3,
    fontSize: 14,
    color: '#333',
    ...Fonts.BlackColor16Regular,
  },
  buttonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
});

export default EmployeeComponent;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import EmployeeComponent from "../Components/EmployeeComponent"; // Ensure the path is correct

const EmployeePage = () => {
    const [employees, setEmployees] = useState([
        { id: '1', name: 'John Doe', role: 'Manager' },
        { id: '2', name: 'Jane Smith', role: 'Receptionist' },
    ]);
    const [newEmployee, setNewEmployee] = useState({ name: '', role: '' });

    const handleAddEmployee = () => {
        if (!newEmployee.name || !newEmployee.role) {
            alert('Please fill in all fields.');
            return;
        }
        setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
        setNewEmployee({ name: '', role: '' }); // Reset form
    };

    const handleEdit = (id) => {
        // Functionality to edit an employee
        console.log('Editing employee:', id);
    };

    const handleDelete = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Manage Employees</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={newEmployee.name}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Role"
                        value={newEmployee.role}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, role: text })}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
                        <Text style={styles.addButtonText}>Add Employee</Text>
                    </TouchableOpacity>
                </View>
                {employees.map(employee => (
                    <EmployeeComponent
                        key={employee.id}
                        employee={employee}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
    },
});

export default EmployeePage;
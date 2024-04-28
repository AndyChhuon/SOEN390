import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import EmployeeComponent from "../Components/EmployeeComponent"; // Ensure that the path is correct

const EmployeePage = () => {
    const [employees, setEmployees] = useState([
        { id: '10011', firstname: 'John', lastname: 'Doe', role: 'Manager' },
        { id: '10012', firstname: 'Jane', lastname: 'Smith', role: 'Receptionist' },
    ]);
    const [newEmployee, setNewEmployee] = useState({
        id: '',
        firstname: '',
        lastname: '',
        role: '',
        email: '',
        saddress: '',
        pcode: '',
        province: '',
        city: ''
    });

    const handleAddEmployee = () => {
        if (!newEmployee.firstname || !newEmployee.lastname || !newEmployee.role || !newEmployee.email) {
            alert('Please fill in all fields.');
            return;
        }
        setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
        setNewEmployee({ firstname: '', lastname: '', role: '' }); // Reset form
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
                <Text style={styles.header}>Manage Employee Roles</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Employee ID"
                        value={newEmployee.id}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, id: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Employee First Name"
                        value={newEmployee.firstname}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, firstname: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Employee Last Name"
                        value={newEmployee.lastname}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, lastname: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Employee Role"
                        value={newEmployee.role}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, role: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email ID"
                        value={newEmployee.email}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, email: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Street Address"
                        value={newEmployee.saddress}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, saddress: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        value={newEmployee.pcode}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, pcode: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Province"
                        value={newEmployee.province}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, province: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={newEmployee.city}
                        onChangeText={(text) => setNewEmployee({ ...newEmployee, city: text })}
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
        padding: 60,
        paddingTop: 80,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
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
        color: 'white',
    },
    addButton: {
        // backgroundColor: Colors.primary,
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        // fontWeight: 'bold', 
    },
});

export default EmployeePage;
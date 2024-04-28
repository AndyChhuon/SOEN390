import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { db } from '../config/firebaseConfig';
import { ref, set, update } from 'firebase/database';

class EmployeeRoleManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: {}, // Object containing the roles
      employeeRoles: {}, // Object containing employeeID: role mappings
    };
  }

  componentDidMount() {
    this.fetchRoles();
    this.fetchEmployeeRoles();
  }

  // Fetching the roles from Firebase
  fetchRoles = () => {
    // Implement the logic to fetch roles from the Firebase Realtime Database
  };

  // Fetching the employee roles from Firebase
  fetchEmployeeRoles = () => {
    // Implement the logic to fetch employee roles from the Firebase Realtime Database
  };

  // Add a new role to Firebase and update state
  addRole = (roleName, permissions) => {
    const roleRef = ref(db, `roles/${roleName}`);
    set(roleRef, permissions).then(() => {
      this.setState(prevState => ({
        roles: { ...prevState.roles, [roleName]: permissions },
      }));
    }).catch(error => {
      console.error("Error adding role: ", error);
    });
  };

  // Assign a role to an employee in Firebase and update state
  assignRoleToEmployee = (employeeId, roleName) => {
    const employeeRolesRef = ref(db, `employeeRoles/${employeeId}`);
    update(employeeRolesRef, { roleName }).then(() => {
      this.setState(prevState => ({
        employeeRoles: { ...prevState.employeeRoles, [employeeId]: roleName },
      }));
    }).catch(error => {
      console.error("Error assigning role to employee: ", error);
    });
  };

  render() {
    const { roles, employeeRoles } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.entries(employeeRoles)}
          keyExtractor={([employeeId,]) => employeeId}
          renderItem={({ item: [employeeId, roleName] }) => (
            <View style={styles.employeeContainer}>
              <Text style={styles.employeeName}>{`Employee ID: ${employeeId}`}</Text>
              <Text style={styles.roleName}>{`Role: ${roleName}`}</Text>
              <View style={styles.rolesList}>
                {Object.keys(roles).map((role, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.roleButton}
                    onPress={() => this.assignRoleToEmployee(employeeId, role)}
                  >
                    <Text style={styles.roleButtonText}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.bodyBackColor2,
  },

  employeeContainer: {
    paddingVertical: Sizes.fixPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayColor,
  },

  employeeName: {
    ...Fonts.whiteColor16Medium,
  },

  roleName: {
    ...Fonts.whiteColor16Medium,
  },

  rolesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Sizes.fixPadding,
  },

  roleButton: {
    marginRight: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.primary,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5,
  },

  roleButtonText: {
    ...Fonts.whiteColor14Medium,
  },
  
});

export default EmployeeRoleManagement;

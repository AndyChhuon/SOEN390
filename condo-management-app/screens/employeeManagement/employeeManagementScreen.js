import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { ThemedButton } from "react-native-really-awesome-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/FontAwesome5";
import Dropdown from "../Components/Dropdown";

import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Button,
  Alert,
  Image,
  Linking,
  Animated,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import useAuth from "../../hooks/useAuth";

const employeeManagementScreen = ({ navigation }) => {
  const {
    getEmployableIds,
    getEmployedUsers,
    addNewEmployment,
    removeEmployee,
  } = useAuth();
  const [employees, setemployees] = useState([]);
  const [employableArray, setEmployableArray] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { width, height } = windowDimensions;
  const styles = createStyles(height);

  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleExpansion = () => {
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue: expanded ? 0 : 200,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  console.log("employableArray", employableArray);

  useEffect(() => {
    getEmployableIds(setEmployableArray);
    getEmployedUsers(setemployees);
  }, []);

  const addEmployeeClick = () => {
    if (selectedEmployee) {
      addNewEmployment(selectedEmployee, setemployees, setEmployableArray);
    }
  };

  const removeEmployeeClick = (employeeId) => {
    removeEmployee(employeeId, setemployees, setEmployableArray);
  };

  function DropdownEmployees() {
    return (
      <View>
        <Text style={[Fonts.whiteColor22Bold, { margin: 15 }]}>
          Select Employee
        </Text>
        <Dropdown
          data={
            employableArray &&
            employableArray.map((id) => {
              return { label: id, value: id };
            })
          }
          onSelect={(item) => setSelectedEmployee(item.value)}
          dropdownText={"Select Employee"}
        />
      </View>
    );
  }

  console.log("employees", employees);

  const displayemployees = () => {
    return employees.map((employee, index) => {
      if (index == 0) {
        return (
          <>
            <View
              key="header"
              style={{
                padding: 20,
                backgroundColor: Colors.cardmaincolor,
                borderBottomColor: "#000",
                borderBottomWidth: 0,
                marginBottom: 10,
                borderRadius: 10,
                elevation: 2,
                elevation: 2,
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowColor: "black",
                shadowOffset: { height: 2, width: 0 },
                shadowOffset: { width: 2, height: 2 },
                flexDirection: width > 900 ? "row" : "column",
                position: "relative",
                alignContent: "center",
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <Text style={styles.employeeItem}>Name</Text>
                <Text style={styles.employeeItem}>ID</Text>
                <Text style={styles.employeeItem}>Phone</Text>
                <Text style={styles.employeeItem}>Email</Text>
                <Text style={styles.employeeItem}>Address</Text>
                <Text style={{ flex: 0.5 }}></Text>
              </View>
            </View>
            <View
              key={employee.id}
              style={{
                padding: 20,
                backgroundColor: Colors.cardmaincolor,
                borderBottomColor: "#000",
                borderBottomWidth: 0,
                marginBottom: 10,
                borderRadius: 10,
                elevation: 2,
                elevation: 2,
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowColor: "black",
                shadowOffset: { height: 2, width: 0 },
                shadowOffset: { width: 2, height: 2 },
                flexDirection: width > 900 ? "row" : "column",
                position: "relative",
                alignContent: "center",
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <Text style={styles.employeeItem}>
                  {employee.firstName + " " + employee.lastName}
                </Text>
                <Text style={styles.employeeItem}>{employee.id}</Text>
                <Text style={styles.employeeItem}>{employee.phoneNumber}</Text>
                <Text style={styles.employeeItem}>{employee.userEmail}</Text>
                <Text style={styles.employeeItem}>
                  {employee.streetAddress}
                </Text>
                <View
                  style={{
                    flex: 0.5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={{ cursor: "pointer" }}
                    id="delete_button"
                    name="delete"
                    size={30}
                    color="rgb(159 49 49)"
                    onPress={() => removeEmployeeClick(employee.id)}
                  />
                </View>
              </View>
            </View>
          </>
        );
      } else {
        return (
          <View
            key={employee.id}
            style={{
              padding: 20,
              backgroundColor: Colors.cardmaincolor,
              borderBottomColor: "#000",
              borderBottomWidth: 0,
              marginBottom: 10,
              borderRadius: 10,
              elevation: 2,
              elevation: 2,
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowColor: "black",
              shadowOffset: { height: 2, width: 0 },
              shadowOffset: { width: 2, height: 2 },
              flexDirection: width > 900 ? "row" : "column",
              position: "relative",
              alignContent: "center",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Text style={styles.employeeItem}>
                {employee.firstName + " " + employee.lastName}
              </Text>
              <Text style={styles.employeeItem}>{employee.id}</Text>
              <Text style={styles.employeeItem}>{employee.phoneNumber}</Text>
              <Text style={styles.employeeItem}>{employee.userEmail}</Text>
              <Text style={styles.employeeItem}>{employee.streetAddress}</Text>
              <View
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{ cursor: "pointer" }}
                  id="delete_button"
                  name="delete"
                  size={30}
                  color="rgb(159 49 49)"
                  onPress={() => removeEmployeeClick(employee.id)}
                />
              </View>
            </View>
          </View>
        );
      }
    });
  };

  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, height: height }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={{ margin: 10, alignContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  ...Fonts.whiteColor30SemiBold,
                }}
              >
                Manage employees
              </Text>
              <ThemedButton
                name="bruce"
                type="primary"
                width={width * 0.2}
                style={{
                  marginRight: 20,
                  alignSelf: "flex-start",
                  raiseLevel: 2,
                  borderRadius: 5,
                  padding: 10,
                }}
                onPress={() => toggleExpansion()}
              >
                <Icon
                  id="add_button"
                  name="add-circle-outline"
                  size={30}
                  color="white"
                />
              </ThemedButton>
            </View>
            <TouchableOpacity>
              <Animated.View style={{ height: animation, overflow: "scroll" }}>
                <View>
                  {DropdownEmployees()}
                  <ThemedButton
                    name="bruce"
                    type="primary"
                    style={[
                      { marginLeft: 15, marginRight: 15, marginBottom: 20 },
                    ]}
                    onPress={() => addEmployeeClick()}
                    raiseLevel={2}
                    textSize={20}
                    paddingHorizontal={20}
                    borderRadius={5}
                  >
                    <Text
                      style={{
                        ...Fonts.primaryColor22SemiBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      Add Employee
                    </Text>
                  </ThemedButton>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              margin: 30,
            }}
          >
            <Text
              style={{
                ...Fonts.whiteColor22Bold,
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              My Employees
            </Text>
            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              style={{
                height: height * 0.85,
                marginBottom: 55,
              }}
            >
              {employees && displayemployees()}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );

  if (Platform.OS === "web") {
    return content;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
        {content}
      </SafeAreaView>
    );
  }
};

export default employeeManagementScreen;

function createStyles(height) {
  return StyleSheet.create({
    textFieldWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
      paddingVertical: (Sizes.fixPadding + 2.0) / 2.0,
    },

    propertyItem: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    title: {
      fontWeight: "600",
      color: "white",
      marginRight: 10,
    },

    employeeItem: {
      fontWeight: "600",
      color: "white",
      marginRight: 10,
      flex: 1,
      textAlign: "center",
    },
    value: {
      color: "white",
    },

    sizing: {
      fontSize: 18,
      fontWeight: "600",
      color: "white",
      marginRight: 6,
    },

    sizingUnderline: {
      fontSize: 18,
      color: "white",
      marginRight: 6,
      textDecorationLine: "underline",
    },

    content: {
      fontSize: 18,
      color: "white",
    },
  });
}

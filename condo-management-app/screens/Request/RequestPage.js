import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Dimensions,
  Picker,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import Dropdown from "../Components/Dropdown";

const RequestPage = ({ navigation }) => {
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = windowDimensions;

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const styles = createStyles(width, height);

  const data = [
    { label: "Select...", value: null },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Complaint", value: "Complaint" },
  ];

  //Backend code for fetching role,name and image will go here, I just implemented static frontend code.
  //AFTER SELECTING FROM DROPDOWN, THE ASSIGNED NAME, IMAGE AND ROLE WILL SHOW.
  useEffect(() => {
    if (selectedRequestType === "Maintenance") {
      setAssignee({ name: "John Doe", role: "Maintenance", image: null });
    } else if (selectedRequestType === "Complaint") {
      setAssignee({ name: "Jane Smith", role: "Manager", image: null });
    } else {
      setAssignee(null);
    }
  }, [selectedRequestType]);

  //SEND BUTTON FUNCTIONS

  const handleRequest = () => {
    navigation.navigate("ChatPage", {
      assigneeName: assignee.name,
      initialMessage: requestMessage,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={{
            ...Fonts.whiteColor20SemiBold,
            marginLeft: 20,
            marginTop: 20,
            fontSize: 30,
          }}
        >
          Requests
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.holder}>
            <View style={styles.assigneeContainer}>
              {assignee && (
                <>
                  {assignee.image ? (
                    <Image
                      source={{ uri: assignee.image }}
                      style={styles.assigneeImage}
                    />
                  ) : (
                    <View style={styles.assigneeImage} />
                  )}
                  <Text style={styles.assigneeText}>{assignee.name}</Text>
                  <Text style={styles.assigneeText}>Role: {assignee.role}</Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Select Request Type:</Text>

              <Picker
                selectedValue={selectedRequestType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedRequestType(itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Select..." value={null} />
                <Picker.Item label="Maintenance" value="Maintenance" />
                <Picker.Item label="Complaint" value="Complaint" />
              </Picker>
            </View>
            <Text style={styles.label}>Message:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your request message"
              multiline={true}
              value={requestMessage}
              onChangeText={setRequestMessage}
            />
            <TouchableOpacity style={styles.button} onPress={handleRequest}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*IMAGE CODES*/}
        {/* Right half */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestPage;

const createStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
    rowContainer: {
      flexDirection: "column",
      margin: "auto", // Center the row
      flex: 1,
    },
    holder: {},
    inputContainer: {
      width: "80%", // Adjusted width
      height: "70%", // Adjusted height
    },
    labelContainer: {
      flexDirection: "row",
      margin: 15,
    },
    label: {
      ...Fonts.whiteColor18Medium,
      marginRight: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    picker: {
      flex: 1,
      height: 30,
      width: "auto", // Adjusted width
      backgroundColor: "#fff", // A shade lighter than the background color
      color: "black", // Light grey font color
    },

    input: {
      height: 30,
      flex: 1,
      borderColor: "rgba(0, 0, 0, 0.7)", // Dark grey color with 70% opacity
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      padding: 10,
      width: width * 0.5, // Adjusted width
      color: Colors.white,
      fontSize: 12,
      ...Fonts.whiteColor16Regular,
    },
    button: {
      backgroundColor: "rgba(255,255,255,0.07)",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: "center",
      width: 150, // Adjusted width
    },
    buttonText: {
      color: Colors.white,
      ...Fonts.whiteColor16Regular,
      fontSize: 14,
    },
    assigneeContainer: {
      flex: 1,
      marginBottom: 20,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      width: "50%", // Adjusted width
    },
    assigneeImage: {
      width: "30%", // Adjusted width
      aspectRatio: 1, // Maintain aspect ratio
      borderRadius: 20,
      backgroundColor: "lightgray", // Placeholder color for empty box
    },
    assigneeText: {
      ...Fonts.whiteColor16Regular,
      marginTop: 10,
    },
  });

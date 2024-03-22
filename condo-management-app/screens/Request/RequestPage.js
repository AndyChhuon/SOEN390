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


const RequestPage = ({ navigation }) => {
  const height = Dimensions.get("window").height;
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [requestMessage, setRequestMessage] = useState(''); 
  const styles = createStyles(height);






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
    navigation.navigate("ChatPage",{ assigneeName: assignee.name,
      initialMessage: requestMessage, })
     
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ ...Fonts.whiteColor20SemiBold, marginLeft: 20, marginTop: 20, fontSize: 30 }}>
          Requests
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.leftHalf}>
            {/* Left half */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Select Request Type:</Text>
                <Picker
                  selectedValue={selectedRequestType}
                  onValueChange={(itemValue, itemIndex) => setSelectedRequestType(itemValue)}
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
          <View style={styles.rightHalf}>
            <View style={styles.assigneeContainer}>
              {assignee && (
                <>
                  {assignee.image ? (
                    <Image source={{ uri: assignee.image }} style={styles.assigneeImage} />
                  ) : (
                    <View style={styles.assigneeImage} />
                  )}
                  <Text style={styles.assigneeText}>{assignee.name}</Text>
                  <Text style={styles.assigneeText}>Role: {assignee.role}</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestPage;

const createStyles = (height) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
    rowContainer: {
      flexDirection: "row",
      flex: 1,
    },
    leftHalf: {
      flex: 1,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center", // Added alignItems
    },
    rightHalf: {
      flex: 1,
      marginLeft: 10,
    },
    inputContainer: {
      width: "80%", // Adjusted width
      height: "70%", // Adjusted height
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    label: {
      ...Fonts.whiteColor16Regular,
      marginRight: 10,
      marginBottom: 10,
    },
   picker: {
    flex: 1,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#fff", // White background color
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
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    assigneeImage: {
      width: "50%", // Adjusted width
      aspectRatio: 1, // Maintain aspect ratio
      borderRadius: 20,
      backgroundColor: "lightgray", // Placeholder color for empty box
    },
    assigneeText: {
      ...Fonts.whiteColor16Regular,
      marginTop: 10,
    },
  });

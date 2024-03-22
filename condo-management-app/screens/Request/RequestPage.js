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
      setAssignee({ name: "John Doe", role: "Maintenance", image:  require("../../assets/images/maintain.png") });
    } else if (selectedRequestType === "Complaint") {
      setAssignee({ name: "Jane Smith", role: "Manager",  image: require("../../assets/images/complaint.png")});
    } else {
      setAssignee(null);
    }
  }, [selectedRequestType]);

  //SEND BUTTON FUNCTIONS

  const handleRequest = () => {
    navigation.navigate("ChatPage",{ assigneeName: assignee.name, assigneeImage: assignee.image,
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
      {assignee.image !== null ? (
        <Image source={assignee.image} style={styles.assigneeImage} />
      ) : (
        <View style={styles.assigneeImagePlaceholder} />
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
      alignItems: "center", 
    },
    rightHalf: {
      flex: 1,
      marginLeft: 10,
    },
    inputContainer: {
      width: "80%", 
      height: "70%", 
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
  backgroundColor: "rgba(255, 255, 255, 0.5)", 
  color: "black", 
},

   input: {
  height: 30,
  flex: 1,
  borderColor: "rgba(0, 0, 0, 0.7)", 
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
      width: 150, 
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
      maxWidth: "100%",
      height: "auto", 
      aspectRatio: 1, 
      borderRadius: 20,
      backgroundColor: "lightgray", 
    },

    assigneeImagePlaceholder: {
      width: "50%", 
      aspectRatio: 1, 
      borderRadius: 20,
      backgroundColor: "lightgray", 
    },
    assigneeText: {
      ...Fonts.whiteColor16Regular,
      marginTop: 10,
    },
  });

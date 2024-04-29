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
  Keyboard,
} from "react-native";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";

const RequestPage = ({ navigation }) => {
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [requestMessage, setRequestMessage] = useState(''); 
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 600);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const styles = createStyles(isMobile);

  useEffect(() => {
    const handleDimensionsChange = () => {
      setIsMobile(Dimensions.get("window").width < 600);
    };

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardStatus(false);
      }
    );

    Dimensions.addEventListener("change", handleDimensionsChange);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      Dimensions.removeEventListener("change", handleDimensionsChange);
    };
  }, []);

  useEffect(() => {
    if (selectedRequestType === "Maintenance") {
      setAssignee({ name: "John Doe", role: "Maintenance", image:  require("../../assets/images/maintain.png") });
    } else if (selectedRequestType === "Complaint") {
      setAssignee({ name: "Jane Smith", role: "Manager",  image: require("../../assets/images/complaint.png")});
    } else {
      setAssignee(null);
    }
  }, [selectedRequestType]);

  const handleRequest = () => {
    navigation.navigate("ChatPage",{ assigneeName: assignee.name, assigneeImage: assignee.image,
      initialMessage: requestMessage, })
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ ...Fonts.whiteColor20SemiBold, marginLeft: 20, marginTop: 20, fontSize: 30 }}>
            Requests
          </Text>
          <View style={isMobile ? styles.columnContainer : styles.rowContainer}>
            <View style={styles.leftHalf}>
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
                  id="request_msg"
                  style={styles.input}
                  placeholder="Enter your request message"
                  multiline={true}
                  numberOfLines={6}
                  value={requestMessage} 
                  onChangeText={setRequestMessage}
                />
                <TouchableOpacity style={styles.button} onPress={handleRequest}>
                  <Text id="send_btn" style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RequestPage;

const createStyles = (isMobile) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
    rowContainer: {
      flexDirection: "row",
      flex: 1,
    },
    columnContainer: {
      flexDirection: "column",
      flex: 1,
    },
    leftHalf: {
      flex: 1,
      marginRight: isMobile ? 0 : 10,
      marginBottom: isMobile ? 10 : 0,
      justifyContent: "center",
      alignItems: "center", 
    },
    rightHalf: {
      flex: 1,
      marginLeft: isMobile ? 0 : 10,
      marginBottom: isMobile ? 10 : 0,
    },
    inputContainer: {
      width: isMobile ? "100%" : "80%", 
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
      height: isMobile ? 120 : 150,
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
      width: isMobile ? "100%" : 150, 
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
      marginTop: isMobile ? 20 : 0,
      marginBottom: isMobile ? 50 : 0,
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

import React, { useState, useEffect } from "react";
import {
 SafeAreaView,
 View,
 ScrollView,
 TouchableOpacity,
 Dimensions,
 StyleSheet,
 TouchableWithoutFeedback,
 Platform,
 Image,
 Modal,
 Button,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Text } from "react-native";
import { ThemedButton } from "react-native-really-awesome-button";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import useAuth from "../../hooks/useAuth";

const LandingPage = ({ navigation }) => {
 const [modalVisible, setModalVisible] = useState(false);
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

 const handlePressOutsideTextBox = () => {
  console.log("Dismiss keyboard or other interaction");
 };

 const content = (
  <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2, flex: 1 }}>
   <ScrollView style={{ backgroundColor: Colors.bodyBackColor2 }}>
    {Header()}

    <Modal
     animationType="slide"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
     }}
    >
     <View style={styles.centeredView}>
      <View style={styles.modalView}>
       <Text style={Fonts.whiteColor22Bold}>What do you want to do?</Text>
       <View style={{ padding: 10, margin: 10, flexDirection: "column" }}>
        <View style={{ margin: 20, alignSelf: "center" }}>
         <MaterialIcon
          name="key"
          style={{ alignSelf: "center" }}
          size={45}
          color="#fff"
          onPress={() => {
           setModalVisible(!modalVisible);
           navigation.navigate("Register");
          }}
         />
         <Text style={Fonts.whiteColor14Regular}>Rent</Text>
        </View>
        <View style={{ margin: 20, alignSelf: "center" }}>
         <MaterialIcon
          style={{ alignSelf: "center" }}
          name="business"
          size={45}
          color="#fff"
          onPress={() => {
           setModalVisible(!modalVisible);
           navigation.navigate("signupScreenOwner");
          }}
         />
         <Text style={Fonts.whiteColor14Regular}>Rent Your Property</Text>
        </View>
        <View style={{ margin: 20, alignSelf: "center" }}>
         <MaterialIcon
          style={{ alignSelf: "center" }}
          name="business-center"
          size={45}
          color="#fff"
          onPress={() => {
           setModalVisible(!modalVisible);
           navigation.navigate("signupScreenCompany");
          }}
         />
         <Text style={Fonts.whiteColor14Regular}>Start Your Company</Text>
        </View>
        <View style={{ margin: 20, alignSelf: "center" }}>
         <TouchableOpacity
          onPress={() => {
           setModalVisible(!modalVisible);
          }}
         >
          <Text style={Fonts.grayColor12Medium}>Go Back</Text>
         </TouchableOpacity>
        </View>
       </View>
      </View>
     </View>
    </Modal>
   </ScrollView>
  </SafeAreaView>
 );

 if (Platform.OS === "web") {
  return content;
 } else {
  return (
   <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
     {content}
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
 }

 function Header() {
  return (
   <View style={styles.header}>
    <Image source={require("./TCMC2.png")} style={styles.logo} />
    <MaterialIcon
     style={{ margin: 20, alignSelf: "center" }}
     name="person"
     size={45}
     color="#fff"
     onPress={() => {
      setModalVisible(true);
     }}
    />
   </View>
  );
 }
};

const createStyles = () => {
 return StyleSheet.create({
  header: {
   backgroundColor: Colors.primary,
   padding: 10,
   flexDirection: "row",
   justifyContent: "space-between",
   alignContent: "center",
  },
  logo: {
   width: 120,
   height: 120,
   tintColor: "#fff",
   marginLeft: 20,
   resizeMode: "contain",
  },

  centeredView: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   marginTop: 22,
   backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
   margin: 20,
   backgroundColor: Colors.bodyBackColor2,
   borderRadius: 20,
   padding: 35,
   alignItems: "center",
   shadowColor: "#000",
   shadowOffset: {
    width: 0,
    height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,
  },
  button: {
   borderRadius: 20,
   margin: 10,
   padding: 10,
   elevation: 2,
  },
  buttonClose: {
   backgroundColor: "#2196F3",
  },
  textStyle: {
   color: "white",
   fontWeight: "bold",
   textAlign: "center",
  },
 });
};

const styles = createStyles();

export default LandingPage;

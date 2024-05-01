import React, { useRef, useState, useEffect, useFocusEffect } from "react";
import {
 SafeAreaView,
 View,
 Image,
 Keyboard,
 Dimensions,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 KeyboardAvoidingView,
 TouchableWithoutFeedback,
 Platform,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedButton } from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";

const LandingPage = ({ navigation }) => {
 const { height, width } = Dimensions.get("window");
 const styles = createStyles(height);
 const [windowDimensions, setWindowDimensions] = useState(
  Dimensions.get("window")
 );

 useEffect(() => {
  const onChange = ({ window }) => {
   setWindowDimensions(window);
  };

  Dimensions.addEventListener("change", onChange);
  return () => Dimensions.removeEventListener("change", onChange);
 }, []);

 const content = (
  <SafeAreaView style={styles.container}>
   {backgroundImage()}

   {card()}
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

 function card() {
  return (
   <View style={styles.card}>
    <Text style={styles.title}>The Condo Management Company</Text>
    <View style={styles.buttonContainer}>
     <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Register")}
     >
      <Text style={styles.buttonText}>Rent a Property</Text>
     </TouchableOpacity>
     <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("signupScreenOwner")}
     >
      <Text style={styles.buttonText}>Rent Your Property</Text>
     </TouchableOpacity>
     <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("signupScreenCompany")}
     >
      <Text style={styles.buttonText}>Start Managing Your Condos</Text>
     </TouchableOpacity>
    </View>
   </View>
  );
 }

 function backgroundImage() {
  return (
   <Image
    source={require("./landing.png")}
    style={{
     width: "30%",
     height: "30%",
     margin: 40,
     alignSelf: "center",
     resizeMode: "center",
    }}
   />
  );
 }

 function loginTitle() {
  return (
   <View
    style={{
     marginVertical: (Sizes.fixPadding * 4.0 * height) / 880,
     alignItems: "center",
     zIndex: 1,
     margin: "auto",
     marginLeft: "auto",
     marginRight: "auto",
    }}
   >
    <Text style={{ ...Fonts.whiteColor50SemiBold }}>
     The Condo Management Company
    </Text>
   </View>
  );
 }
};

function createStyles(width, height) {
 return StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: Colors.bodyBackColor2,
  },
  card: {
   backgroundColor: Colors.bodyBackColor,
   borderRadius: 20,
   padding: 20,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
   width: "90%",
   alignItems: "center",
  },
  title: {
   fontSize: 22,
   fontWeight: "bold",
   marginBottom: 20,
   color: "white",
  },
  buttonContainer: {
   width: "50%",
   marginBottom: 20,
  },
  button: {
   backgroundColor: "#1E88E5",
   padding: 15,
   borderRadius: 10,
   marginBottom: 10,
   alignItems: "center",
  },
  buttonText: {
   color: "white",
   fontSize: 16,
   fontWeight: "500",
  },
  quoteContainer: {
   marginTop: 20,
   borderColor: "#DDD",
   borderTopWidth: 1,
   paddingTop: 20,
  },
  quote: {
   fontStyle: "italic",
   textAlign: "center",
   color: "#666",
  },
  author: {
   marginTop: 10,
   fontSize: 14,
   color: "#333",
   fontWeight: "bold",
   textAlign: "center",
  },
 });
}

export default LandingPage;

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
  ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedButton } from "react-native-really-awesome-button";

const Terms = ({ navigation }) => {
  const [state, setState] = useState({
    password: null,
    userEmail: null,
    securePassword: true,
  });
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

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: height }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              flexDirection: "column",
              alignContent: "center",
              width: width * 0.95,
              height: height,
              padding: 10,
              marginVertical: 15,
            }}
          >
            {backArrow()}
            {TermsTitle()}
            {TermsAndConditions()}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );

  if (Platform.OS === "web") {
    return content;
  } else {
    return (
      <TouchableWithoutFeedback onPress={handlePressOutsideTextBox}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}
        >
          {content}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <FontAwesome5
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => {
            navigation.push("Register");
          }}
        />
      </View>
    );
  }

  function TermsAndConditions (){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Welcome to Condo Medium!</Text>
          <Text style={styles.bodyText}>
            These terms and conditions outline the rules and regulations for the use of Condo Medium's application, located at [Application URL]. By accessing this app, we assume you accept these terms and conditions. Do not continue to use Condo Medium if you do not agree to take all of the terms and conditions stated on this page.
          </Text>
  
          <Text style={styles.sectionTitle}>1. License</Text>
          <Text style={styles.bodyText}>
            Unless otherwise stated, Condo Medium and/or its licensors own the intellectual property rights for all material on Condo Medium. All intellectual property rights are reserved. You may access this from Condo Medium for your own personal use subjected to restrictions set in these terms and conditions. You must not: Republish material from Condo Medium; Sell, rent, or sub-license material from Condo Medium; Reproduce, duplicate, or copy material from Condo Medium; Redistribute content from Condo Medium.
          </Text>
  
          <Text style={styles.sectionTitle}>2. User Content</Text>
          <Text style={styles.bodyText}>
            In these terms and conditions, "User Content" means material (including without limitation text, images, audio material, video material, and audio-visual material) that you submit to this app, for whatever purpose. You grant to Condo Medium a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your User Content in any existing or future media. You also grant to Condo Medium the right to sub-license these rights and the right to bring an action for infringement of these rights.
          </Text>
  
          <Text style={styles.sectionTitle}>3. No warranties</Text>
          <Text style={styles.bodyText}>
            This app is provided “as is,” with all faults, and Condo Medium express no representations or warranties, of any kind related to this app or the materials contained on this app. Also, nothing contained on this app shall be interpreted as advising you.
          </Text>
  
          <Text style={styles.sectionTitle}>4. Limitation of liability</Text>
          <Text style={styles.bodyText}>
            In no event shall Condo Medium, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this app whether such liability is under contract. Condo Medium, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this app.
          </Text>
  
          <Text style={styles.sectionTitle}>5. Indemnification</Text>
          <Text style={styles.bodyText}>
            You hereby indemnify to the fullest extent Condo Medium from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these terms and conditions.
          </Text>
  
          <Text style={styles.sectionTitle}>6. Severability</Text>
          <Text style={styles.bodyText}>
            If any provision of these terms and conditions is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
          </Text>
  
          <Text style={styles.sectionTitle}>7. Variation of Terms</Text>
          <Text style={styles.bodyText}>
            Condo Medium is permitted to revise these terms and conditions at any time as it sees fit, and by using this app, you are expected to review these terms and conditions on a regular basis.
          </Text>
  
          <Text style={styles.sectionTitle}>8. Assignment</Text>
          <Text style={styles.bodyText}>
            The Condo Medium is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms and conditions without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms and conditions.
          </Text>
  
          <Text style={styles.sectionTitle}>9. Entire Agreement</Text>
          <Text style={styles.bodyText}>
            These terms and conditions constitute the entire agreement between Condo Medium and you in relation to your use of this app and supersede all prior agreements and understandings.
          </Text>
  
          <Text style={styles.sectionTitle}>10. Governing Law & Jurisdiction</Text>
          <Text style={styles.bodyText}>
            These terms and conditions will be governed by and interpreted in accordance with the laws of the State/Country of [Your Location], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your Location] for the resolution of any disputes.
          </Text>
          <Text style={styles.updateDate}>This document was last updated on [Date].</Text>
        </View>
      </ScrollView>
    );
  };

  function TermsTitle() {
    return (
      <View
        style={{
          marginVertical: (Sizes.fixPadding * 4.0 * height) / 880,
          alignItems: "center",
          zIndex: 1,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>
          Terms and Conditions for Condo Medium
        </Text>
      </View>
    );
  }
};

function createStyles(width, height) {
  return StyleSheet.create({
    loginContainer: {
      justifyContent: "center",
      backgroundColor: "red",
      height: "100%",
    },
    textFieldWrapStyle: {
      flexDirection: "row",
      width: width * 0.6,
      alignItems: "center",
      alignSelf: "center",
      marginVertical: 5,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
    },
    forgetPasswordTextStyle: {
      marginTop: ((Sizes.fixPadding - 5.0) * height) / 880,
      marginHorizontal: Sizes.fixPadding * 2.0,
      textAlign: "right",
      textDecorationLine: "underline",
      ...Fonts.primaryColor14Medium,
    },
    loginButtonStyle: {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: Sizes.fixPadding * 2.0,
      borderRadius: Sizes.fixPadding - 5.0,
      marginTop: (Sizes.fixPadding * 3.0 * height) / 880,
    },
    googleAndFacebookButtonWrapStyle: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      paddingVertical: Sizes.fixPadding + 5.0,
      marginHorizontal: Sizes.fixPadding,
      borderRadius: Sizes.fixPadding - 5.0,
    },
    animatedView: {
      backgroundColor: "#333333",
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
      borderRadius: Sizes.fixPadding * 2.0,
      paddingHorizontal: Sizes.fixPadding + 5.0,
      paddingVertical: Sizes.fixPadding,
      justifyContent: "center",
      alignItems: "center",
    },
    backArrowWrapStyle: {
      position: "absolute",
      width: 40.0,
      height: 40.0,
      borderRadius: 20.0,
      backgroundColor: "rgba(255,255,255,0.05)",
      alignItems: "center",
      justifyContent: "center",
      marginTop: Sizes.fixPadding * 3.0,
      marginBottom: Sizes.fixPadding * 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
      zIndex: 2,
    },
    container: {
      flex: 1,
    },
    content: {
      marginHorizontal: 20,
      marginTop: 20,
    },
    headerText: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: 20,
      marginBottom: 10,
    },
    sectionTitle: {
      fontWeight: "bold",
      color: "#fff",
      fontSize: 18,
      marginTop: 20,
      marginBottom: 5,
    },
    bodyText: {
      fontSize: 16,
      color: "#fff",
      lineHeight: 24,
      textAlign: "justify",
    },
    updateDate: {
      color: "#fff",
      marginTop: 20,
      fontStyle: "italic",
    },
  });
}

export default Terms;

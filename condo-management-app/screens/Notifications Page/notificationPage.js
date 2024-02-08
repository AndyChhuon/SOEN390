import React, { useRef, useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";

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
import Card from '../Components/Card';
import { IoMdPerson } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { FaHouse } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { MaterialIcons} from "@expo/vector-icons";

const NotificationPage = ({navigation}) => {
  height, width;
  const [wasPopped, setWasPopped] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const { width, height } = windowDimensions;
  const styles = createStyles(height);

  


  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  function backArrow() {
    return (
      <View style={{ ...styles.backArrowWrapStyle }}>
        <MaterialIcons
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => {
            if (wasPopped) return;
            setWasPopped(true);
            navigation.pop();
          }}
        />
      </View>
    );
  }

  const content = (
    <SafeAreaView style={{backgroundColor: Colors.bodyBackColor2}}>
      {backArrow()}
    <ScrollView contentContainerStyle={{flexGrow:1, height: height}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-start"
        }} >
          <View style={{padding: 20, marginBottom:"100"}}>
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "center", margin: 5,
            }}
          >
            Notifications
          </Text>
          <Card style={{width:width, alignItems: "left", alignSelf: "left", marginTop:200}}>
            <View style={{flex: "column"}}>
          <View style={{backgroundColor: Colors.bodyBackColor2, ...Cards.cardNotification, width: width * 0.8 }}>
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "left", margin: 5,
            }}
          >
            Reminder: Elevator Maintenance on February 15th from 9 AM to 5 PM. Please use the stairs or other elevators during this time.
          </Text>

          </View>
          <View style={{ backgroundColor: Colors.bodyBackColor2,...Cards.cardNotification, width: width * 0.8 }}>
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "left", margin: 5,
            }}
          >
            Water Shut-off Notice: Routine maintenance will require a temporary water shut-off on March 3rd, from 10 AM to 2 PM.
          </Text>

          </View>
          <View style={{backgroundColor: Colors.bodyBackColor2, ...Cards.cardNotification, width: width * 0.8 }}>
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "left", margin: 5,
            }}
          >
            New Gym Equipment Arriving Next Week! Check out the latest additions to our fitness center starting March 10th.
          </Text>

          </View>
          <View style={{backgroundColor: Colors.bodyBackColor2, ...Cards.cardNotification, width: width * 0.8 }}>
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "left", margin: 5,
            }}
          >
            Pet Policy Update: Starting April 1st, all pets must be registered with the condo management office. Visit our website for details and registration forms.
          </Text>

          </View>
          </View>
          </Card>

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
  }}

export default NotificationPage;


function createStyles(height) {
  return StyleSheet.create({
    loginContainer: {
      justifyContent: "center",
      backgroundColor: "red",
      height: "100%",
    },
    textFieldWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
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
  });
}
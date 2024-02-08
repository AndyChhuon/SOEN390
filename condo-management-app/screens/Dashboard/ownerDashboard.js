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
import PropertyCard from "../Components/Property";
import Payment from "../Components/Payment";
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
      <View>
      <View style={{...Cards.card,width: width *0.9 , alignSelf: "center", flexDirection: "column"}}>
        <View style={{ flex: 1, }}>
          <View style={{flexDirection: "row", margin: 2, padding:10, alignItems: "center"}}>
            <FaHouse style={{color: Colors.whiteColor}} />
            <Text style={{...Fonts.whiteColor20SemiBold, margin: 10, alignSelf: "center"}}>My Properties</Text>
         </View>
      </View>
      {TenantsView()}
      </View>
      <View style={{...Cards.card,width: width *0.9 , alignSelf: "center", flexDirection: "column"}}>
        <View style={{ flex: 1, }}>
          <View style={{flexDirection: "row", margin: 2, padding:10, alignItems: "center"}}>
            <FaHouse style={{color: Colors.whiteColor}} />
            <Text style={{...Fonts.whiteColor20SemiBold, margin: 10, alignSelf: "center"}}>Payments</Text>
         </View>
      </View>
      <Text style={{...Fonts.whiteColor20SemiBold, margin: 10, alignSelf: "left"}}>$7,283</Text>
      
      <ScrollView contentContainerStyle={{flexGrow:1, height: height}}>
      <Payment name={"John Smith"} width={width} rentPaid={"Yes"} amount={3000}></Payment>
      <Payment name={"Will Smith"} width={width} rentPaid={"Yes"} amount={2459}></Payment>
      <Payment name={"Sam Smith"} width={width} rentPaid={"Yes"} amount={1224}></Payment>
      <Payment name={"Tom Smith"} width={width} rentPaid={"Yes"} amount={600}></Payment>
      </ScrollView>
      </View>
     
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
  function TenantsView() {
    const input = useRef();
    return (
      <View>
        <View
          style={styles.textFieldWrapStyle}
        >

        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >

    <ScrollView >
      <View style={{ flexDirection: "column", height: height }}>
        <PropertyCard width={width} Occupied="Yes" addressText="1412 Test Road" rentPaid="Yes" ticketsOpen="0" imageURL="https://thevaughnrealestategroup.com/wp-content/uploads/2017/11/Brickell-Wind-Condo-View.jpg" />
        <PropertyCard width={width} Occupied="Yes" addressText="1412 Test Road" rentPaid="Yes" ticketsOpen="0" imageURL={"https://media.brstatic.com/2017/10/17165457/what-to-know-before-you-buy-a-condo.jpg"} />
        <PropertyCard width={width} Occupied="Yes" addressText="1412 Test Road" rentPaid="Yes" ticketsOpen="0" imageURL={"http://hawaiihome.me/wp-content/uploads/2017/05/DSC08635-1-e1493843332549.jpg"} />
        <PropertyCard width={width} Occupied="Yes" addressText="1412 Test Road" rentPaid="Yes" ticketsOpen="0" />
        {/* Add more PropertyCard components as needed */}
      </View>
    </ScrollView>
        </View>
      </View>
    );}
  }

  

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
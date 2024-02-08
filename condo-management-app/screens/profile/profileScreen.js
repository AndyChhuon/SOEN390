import React, { useRef, useState, useEffect } from "react";
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
import { IoMdPerson } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons} from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import { ref, update, onValue } from 'firebase/database';
import { db } from "../../config/firebaseConfig";

const Profile = ({ navigation }) => {
  const { user } = useAuth();



  const [state, setState] = useState({
    userEmail: user.email,
    firstName: user.firstName||"",
    lastName: user.lastName||"",
    phoneNumber: user.phoneNumber||"",
    streetAddress: user.streetAddress ||"",
    postalcode: user.postalCode ||"",
    stateProvince: user.stateProvince ||"",
    city: user.city||"",
  });

  //cleans db entries if undefined
  const cleanObject = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  };

  const saveProfileData = () => {
    if (user && user.uid) {
      const userProfileRef = ref(db, `users/${user.uid}`);
      const cleanedState = cleanObject({ ...state });
      update(userProfileRef, cleanedState)
        
        .catch((error) => console.error("Error updating profile: ", error));
    }
  };


  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && user.uid) {
        const userProfileRef = ref(db, `users/${user.uid}`);
        onValue(userProfileRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setState(prevState => ({
              ...prevState,
              ...data,
            }));
          }
        }, {
        });
      }
    };
  
    fetchProfileData();
  }, [user, db]);
  



  height, width;
  const styles = createStyles(height);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const { width, height } = windowDimensions;

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const content = (
    <SafeAreaView style={{backgroundColor: Colors.bodyBackColor2}}>
    <ScrollView contentContainerStyle={{flexGrow:1, height: height}}>
      
      <View style={{}}>
        {backArrow()}
        {Title()}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-start"
      
        }}
      >
       <View style={{height: height, margin: 5}}>
        
       <View style={{...styles.card,width: width * 0.8, alignSelf: "center"}}>
        <View style={{ flex: 1}}>
        <View style={{flexDirection: "row", margin: 2, padding:10, alignItems: "center"}}>
          <FaHouse style={{color: Colors.whiteColor}} />
          <Text style={{...Fonts.whiteColor20SemiBold, margin: 10}}>My Properties</Text>
        </View>
          {TenantsView()}

        </View>

      </View>

      <View>
       <View style={{...styles.card,width: width * 0.8, alignSelf: "center"}}>
        <View style={{ flex: 1}}>
          {FirstNameTextField()}
          {LastNameTextField()}
          {userEmailTextField()}
          {PhoneNumberTextField()}
        </View>
        <View style={{ flex: 1}}>
        {StreetAddressTextField()}
          {PostalCode()}
          {Province()}
          {City()}
        </View>
        
      </View>
      <View style={{...styles.card,width: width * 0.8,  alignSelf: "center"}}>
      {SaveProfileButton()}
      </View>
      </View>

      
      <View style={{...styles.card,width: width * 0.8, alignSelf: "center" }}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "center", margin: 5,
            }}
          >
            Password
          </Text>
        {ChangePassword()}
      </View>
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

  function ChangePasswordClick() {
    //TODO
  }

  function ChangePassword() {
    return (
      <View style={{ flex: 1, width: '100%' }}> 
        <AwesomeButton
          activeOpacity={0.9}
          onPress={async (next) => {
            ChangePasswordClick();
            next();
          }}
          width={null} 
          stretch={true} 
          backgroundColor={Colors.darkBlue}
          raiseLevel={5}
          borderRadius={20}
          backgroundShadow={Colors.grayColor}
          progress
        >
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "center",
            }}
          >
            Change Password
          </Text>
        </AwesomeButton>
      </View>
    );
  }

  function SaveProfileButton() {
    return (
      <View style={{ flex: 1, width: '100%' }}> 
        <AwesomeButton
          activeOpacity={0.9}
          onPress={async (next) => {
            saveProfileData();
            next();
          }}
          width={null} 
          stretch={true} 
          backgroundColor={Colors.secondaryGoldColor}
          raiseLevel={5}
          borderRadius={20}
          backgroundShadow={Colors.grayColor}
          progress
        >
          <Text
            style={{
              ...Fonts.whiteColor20SemiBold,
              textAlign: "center",
            }}
          >
            Save Changes
          </Text>
        </AwesomeButton>
      </View>
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

        <View style={{flexDirection: "row"}}>
        <View style={{...styles.card,width: width * 0.3}}>
                <Image
                 source={{uri: "https://s3.amazonaws.com/usmsswimages/5336/40759/3.jpg"}}
                 style={{width: 200, height: 200}}
                ></Image>

                <View style={{flexDirection: "column", padding: 10}}>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor}}
                >
                  Address: 2155 Rue Test
                </Text>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor}}
                >
                  Occupied: Yes
                </Text>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor }}
                >
                 Rent Paid: Yes

                </Text>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor }}
                >
                  Tickets Open: 0
                </Text>

                </View>

        </View>

        <View style={{...styles.card,width: width * 0.3}}>
                <Image
                 source={{uri: "https://thevaughnrealestategroup.com/wp-content/uploads/2017/11/Brickell-Wind-Condo-View.jpg"}}
                 style={{width: 200, height: 200}}
                ></Image>

                <View style={{flexDirection: "column", padding: 10}}>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor}}
                >
                  Address: 2155 Rue Test
                </Text>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor}}
                >
                  Occupied: Yes
                </Text>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor }}
                >
                 Rent Paid: Yes

                </Text>
                <Text
                  style={{ ...Fonts.parentColor14Medium, color: Colors.whiteColor }}
                >
                  Tickets Open: 0
                </Text>

                </View>

        </View>

        </View>
        </View>
      </View>
    );
  }


  function FirstNameTextField() {
    const input = useRef();
    return (
      <View>
        <View
          style={
           styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <IoMdPerson style={{color: Colors.whiteColor}} />
          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ firstName: value })}
            placeholder="First Name"
            value={state.firstName}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }


  function LastNameTextField() {
    const input = useRef();
    return (
      <View>
        <View
          style={
           styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <IoMdPerson style={{color: Colors.whiteColor}} />
          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ lastName: value })}
            placeholder="Last Name"
            value={state.lastName}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }

  function PhoneNumberTextField() {
    const input = useRef();
    return (
      <View>
        <View
          style={
          styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
          <MdOutlinePhone style={{color: Colors.whiteColor}} />

          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ phoneNumber: value })}
            placeholder="ex. (123)-456-789"
            value={state.phoneNumber}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }

  function StreetAddressTextField() {
    const input = useRef();
    return (
      <View>
        <View
          style={
            styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <FaHouseChimneyUser style={{color: Colors.whiteColor}} />
          </TouchableOpacity>
          <TextInput
            width={0.9 * width}
            ref={input}
            onChangeText={(value) => updateState({ streetAddress: value })}
            placeholder="Street Address"
            value={state.streetAddress}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }

  function PostalCode() {
    const input = useRef();
    return (
      <View>
        <View
          style={
           styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
          <FaHouseChimneyUser style={{color: Colors.whiteColor}} />
          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ postalcode: value })}
            placeholder="Postal Code"
            value={state.postalcode}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }

  function Province() {
    const input = useRef();
    return (
      <View>
        <View
          style={
            styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
        <FaHouseChimneyUser style={{color: Colors.whiteColor}} />

          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ stateProvince: value })}
            placeholder="Province"
            value={state.stateProvince}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }

  function City() {
    const input = useRef();
    return (
      <View>
        <View
          style={
           styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
         <FaHouseChimneyUser style={{color: Colors.whiteColor}} />

          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ city: value })}
            placeholder="City"
            value={state.city}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
          </Text>
        </View>
      </View>
    );
  }


  function userEmailTextField() {
    const input = useRef();
    return (
      <View>
        <View
          style={
            styles.textFieldWrapStyle
          }
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <Image
              source={require("../../assets/images/icons/mail.png")}
              style={{ width: 20.0, height: 20.0, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TextInput
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ userEmail: value })}
            placeholder="Enter Email Address"
            value={user.email}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
            editable={false}
          />
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: (7 * height) / 880,
          }}
        >
        </View>
      </View>
    );
  }

  function Title() {
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
        <Image
          source={{ uri: `https://eu.ui-avatars.com/api/?name=${state.firstName}+${state.lastName}` }}
          style={{ width: 100, height: 100, borderRadius: 50, margin: 10 }}
        />
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>
          Welcome
        </Text>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          {state.firstName}{" "+state.lastName}
        </Text>
      </View>
    );
  }
};

function createStyles(height) {
  return StyleSheet.create({
    loginContainer: {
      justifyContent: "center",
      backgroundColor: "red",
      height: "100%",
    },
    card: {
      flexDirection: 'row',
      backgroundColor: Colors.bodyBackColor, 
      borderRadius: 10,
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84, 
      elevation: 5, 
      padding: 30, 
      marginVertical: 10, 
      marginHorizontal: 40,
      alignSelf: "center",
    },
    cardProperties: {
      flexDirection: 'column',
      backgroundColor: Colors.bodyBackColor, 
      borderRadius: 10,
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84, 
      elevation: 5, 
      padding: 30, 
      marginVertical: 10, 
      marginHorizontal: 40,
      alignSelf: "center",
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

export default Profile;
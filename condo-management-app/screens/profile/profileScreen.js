import React, { useRef, useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import { ThemedButton } from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import PropertyCard from "../Components/Property";

const Profile = ({ navigation }) => {
  const { user, userValues, updateProfileInfo } = useAuth();

  useEffect(() => {
    document.title = "My Profile";
  }, []);

  const [state, setState] = useState({
    //sets variables values
    userEmail: user.email,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    streetAddress: user.streetAddress || "",
    postalcode: user.postalCode || "",
    stateProvince: user.stateProvince || "",
    city: user.city || "",
  });

  const data = [
    { label: "English", value: "1" },
    { label: "French", value: "2" },
    { label: "Spanish", value: "3" },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  //clears db entries if undefined
  const CleanUndefinedEntries = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  };

  //saves profile data to db
  const saveProfileData = () => {
    if (user && user.uid) {
      const cleanedState = CleanUndefinedEntries({ ...state });
      updateProfileInfo(cleanedState);
    }
  };

  //update profile state from backend
  useEffect(() => {
    setState({
      ...state,
      ...userValues,
    });
  }, [userValues]);

  const styles = createStyles(height);

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

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: height*0.92 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, justifyContent: "center"}}
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
                  marginVertical: "5%",
                }}
              >
                {Title()}
                {ManageProfileText()}
                {FirstNameTextField()}
                {LastNameTextField()}
                {userEmailTextField()}
                {PhoneNumberTextField()}
                {StreetAddressTextField()}
                {PostalCode()}
                {Province()}
                {City()}
                {SaveProfileButton()}
                {DropdownC()}
                <View
                  style={{
                    alignSelf: "flex-start",
                    flexDirection: "column",
                    alignContent: "flex-start",
                    margin: 15,
                    zIndex: 0,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.whiteColor22Bold,
                    }}
                  >
                    Reset Your Password
                  </Text>
                    {ChangePassword()}
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
        <FontAwesome5
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
  function ManageProfileText() {
    return (
      <Text
        style={[
          Fonts.whiteColor22Bold,
          { margin: 15},
        ]}
      >
        Manage Your Profile
      </Text>
    );
  }

  function DropdownC() {
    return (
      <View>
        <Text
        style={[
          Fonts.whiteColor22Bold,
          { margin: 15},

        ]}
      >
        Language Preferences
      </Text>
        <Dropdown
          data={data}
          onSelect={(item) => setSelectedValue(item.value)}
          dropdownText={"Select Language"}
        />
      </View>
    );
  }

  function ChangePassword() {
    return (
      <View id="change_pass_btn" style={{ width: "100%"}}>
        <ThemedButton
          name="bruce"
          type="primary"
          raiseLevel={2}
          borderRadius={10}
          onPress={() => ChangePassword()}
        >
          <MaterialIcon
            style={{ marginRight: 15 }}
            name="password"
            size={26}
            color="#fff"
          />
          <Text
            style={{
              ...Fonts.primaryColor16SemiBold,
              color: Colors.whiteColor,
            }}
          >
            Change Password
          </Text>
        </ThemedButton>
      </View>
    );
  }

  function SaveProfileButton() {
    return (
      <View id="save_prof_btn" style={{ margin: 15 }}>
        <ThemedButton
          name="bruce"
          type="primary"
          raiseLevel={2}
          borderRadius={10}
          style={{
            borderRadius: 5,
            padding: 10,
          }}
          onPress={async () => {
            saveProfileData();
          }}
        >
          <FontAwesome5
            style={{ marginRight: 15 }}
            name="save"
            size={26}
            color="#fff"
          />
          <Text
            style={{
              ...Fonts.primaryColor16SemiBold,
              color: Colors.whiteColor,
            }}
          >
            Save Changes
          </Text>
        </ThemedButton>
      </View>
    );
  }
  function FirstNameTextField() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <IoMdPerson style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
            id="f_name"
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
          ></Text>
        </View>
      </View>
    );
  }

  function LastNameTextField() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <IoMdPerson style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
            id="l_name"
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
          ></Text>
        </View>
      </View>
    );
  }

  function PhoneNumberTextField() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <MdOutlinePhone style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
            id="p_number"
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
          ></Text>
        </View>
      </View>
    );
  }

  function StreetAddressTextField() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <FaHouseChimneyUser style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
            id="s_address"
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
          ></Text>
        </View>
      </View>
    );
  }

  function PostalCode() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <FaHouseChimneyUser style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
          id="p_code"
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
          ></Text>
        </View>
      </View>
    );
  }

  function Province() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <FaHouseChimneyUser style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
            id="s_prov"
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
          ></Text>
        </View>
      </View>
    );
  }

  function City() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          >
            <FaHouseChimneyUser style={{ color: Colors.whiteColor }} />
          </TouchableOpacity>
          <TextInput
            id="city"
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
          ></Text>
        </View>
      </View>
    );
  }

  function userEmailTextField() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
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
            id="u_email"
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
        ></View>
      </View>
    );
  }

  function Title() {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: `https://eu.ui-avatars.com/api/?name=${state.firstName[0]}+${state.lastName[0]}`,
            }}
            style={{ width: 75, height: 75, borderRadius: 50, margin: 10 }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              height: 75,
              alignItems: "flex-start",
            }}
          >
            <Text style={[{ ...Fonts.whiteColor26SemiBold }]}>Welcome</Text>
            <Text style={{ ...Fonts.whiteColor14Medium }}>
              {state.firstName} {" " + state.lastName}
            </Text>
          </View>
        </View>
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

    dropdown: {
      height: 50,
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
}

export default Profile;

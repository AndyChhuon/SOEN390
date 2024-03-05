import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedButton } from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";

const RegisterScreen = ({ navigation }) => {
  const { emailSignup } = useAuth();

  const [error, setError] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [agreeError, setAgreeError] = useState(null);

  const [state, setState] = useState({
    password: null,
    userEmail: null,
    securePassword: true,
    backClickCount: 0,
    isAgree: true,
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
    if (error) {
      switch (error) {
        case "auth/email-already-in-use":
          setEmailError("This email address is already in use!");
          break;
        case "auth/invalid-email":
          setEmailError("This email address is invalid!");
          break;
        case "auth/weak-password":
          setPasswordError("This password is too weak!");
          break;
        default:
          setEmailError("The following error has occured: " + error);
      }
    }
  }, [error]);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { password, userEmail, securePassword, backClickCount, isAgree } =
    state;

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    updateState({ backClickCount: 1 });
    setTimeout(() => {
      updateState({ backClickCount: 0 });
    }, 1000);
  }

  const handlePressOutsideTextBox = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const content = (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <View style={{ flexGrow: 1 }}>{loginTitle()}</View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-end", marginHorizontal: 10 }}
      >
        {backgroundImage()}
        <View style={{ flexDirection: "column" }}>
          {userEmailTextField()}
          {passwordTextField()}
          {agreeOrNotInfo()}
          {registerButton()}
        </View>
      </KeyboardAvoidingView>

      {dontAccountInfo()}
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor14Medium }}>
            Press Back Once Again To Exit
          </Text>
        </View>
      ) : null}
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

  function dontAccountInfo() {
    return (
      <Text
        onPress={() => {
          navigation.push("Login");
        }}
        style={{
          alignSelf: "center",
          textAlign: "center",
          paddingBottom: (Sizes.fixPadding * 2.0 * height) / 880,
          marginTop: (Sizes.fixPadding * 4.0 * height) / 880,
        }}
      >
        <Text
          style={{
            ...Fonts.whiteColor14Regular,
          }}
        >
          Already signed up?{" "}
        </Text>
        <Text
          style={{
            ...Fonts.whiteColor14Regular,
            textDecorationLine: "underline",
          }}
        >
          Click here to login
        </Text>
      </Text>
    );
  }

  function backgroundImage() {
    return (
      <Image
        source={require("./image_2.png")}
        style={{
          width: "80%",
          height: "80%",
          margin: 40,
          alignSelf: "center",
          resizeMode: "center"
        }}
      />
    );
  }

  function registerOnClick() {
    setEmailError(null);
    setPasswordError(null);
    setAgreeError(null);
    setError(null);

    if (!userEmail) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (
      !userEmail
        .trim()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError("Please enter a valid email address");
      return;
    } else if (!password) {
      setPasswordError("Please enter a valid password");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else if (!isAgree) {
      setAgreeError("Please agree to the terms and conditions.");
      return;
    }

    emailSignup(setError, userEmail.trim().toLowerCase(), password);
  }

  function registerButton() {
    return (
      <View
        style={{
          alignItems: "center",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <ThemedButton
          name="bruce"
          type="primary"
          raiseLevel={5}
          borderRadius={10}
          onPress={async () => {
            registerOnClick();
            next();
          }}
        >
          <Text
            style={{
              ...Fonts.primaryColor16SemiBold,
              color: Colors.whiteColor,
            }}
          >
            Register
          </Text>
        </ThemedButton>
      </View>
    );
  }

  function passwordTextField() {
    const passInput = useRef();

    return (
      <View>
        <View
          style={
            passwordError
              ? {
                  ...styles.textFieldWrapStyle,
                  justifyContent: "space-between",
                  borderColor: Colors.errorColor,
                  borderWidth: 1,
                }
              : {
                  ...styles.textFieldWrapStyle,
                  justifyContent: "space-between",
                }
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => passInput.current.focus()}
            >
              <MaterialIcons
                name="lock-open"
                size={20}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
            <TextInput
              ref={passInput}
              onChangeText={(value) => updateState({ password: value })}
              placeholder="Enter Password"
              secureTextEntry={securePassword}
              placeholderTextColor={Colors.grayColor}
              style={{
                ...Fonts.whiteColor14Medium,
                marginLeft: Sizes.fixPadding + 2.0,
                flex: 1,
                paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
              }}
              selectionColor={Colors.primaryColor}
            />
            <MaterialCommunityIcons
              name={securePassword ? "eye" : "eye-off"}
              size={20}
              color={Colors.whiteColor}
              onPress={() => updateState({ securePassword: !securePassword })}
            />
          </View>
        </View>
        <View
          style={
            passwordError
              ? {
                  marginHorizontal: Sizes.fixPadding * 2.0,
                  marginBottom: 7,
                }
              : { display: "none" }
          }
        >
          <Text
            style={{ ...Fonts.parentColor14Medium, color: Colors.errorColor }}
          >
            {passwordError}
          </Text>
        </View>
      </View>
    );
  }

  function agreeOrNotInfo() {
    return (
      <View style={{ alignSelf: "center" }}>
        <View style={styles.agreeOrNotInfoWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => updateState({ isAgree: !isAgree })}
            style={{
              backgroundColor: isAgree ? Colors.whiteColor : "transparent",
              borderColor: isAgree ? Colors.whiteColor : Colors.whiteColor,
              ...styles.checkBoxStyle,
            }}
          >
            {isAgree ? (
              <MaterialIcons name="check" color={Colors.blackColor} size={14} />
            ) : null}
          </TouchableOpacity>
          <View>
            <Text>
              <Text style={{ ...Fonts.whiteColor14Medium }}>
                By creating an account, you agree to our {}
              </Text>
              <Text
                style={{
                  ...Fonts.whiteColor14Medium,
                  textDecorationLine: "underline",
                }}
              >
                Terms and Condition
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={
            agreeError
              ? {
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }
              : { display: "none" }
          }
        >
          <Text
            style={{
              ...Fonts.parentColor14Medium,
              color: Colors.errorColor,
            }}
          >
            {agreeError}
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
            emailError
              ? {
                  ...styles.textFieldWrapStyle,
                  borderColor: Colors.errorColor,
                  borderWidth: 1,
                }
              : styles.textFieldWrapStyle
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
            onChangeText={(value) => updateState({ userEmail: value })}
            placeholder="Enter Email Address"
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
            {emailError ? emailError : ""}
          </Text>
        </View>
      </View>
    );
  }

  function loginTitle() {
    return (
      <View
        style={{
          marginVertical: (Sizes.fixPadding * 4.0 * height) / 880,
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.whiteColor26SemiBold }}>
          Let’s get you started.
        </Text>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Your condo management begins here!
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
    backArrowWrapStyle: {
      width: 40.0,
      height: 40.0,
      borderRadius: 20.0,
      backgroundColor: "rgba(255,255,255,0.05)",
      alignItems: "center",
      justifyContent: "center",
    },
    textFieldWrapStyle: {
      flexDirection: "row",
      width: width * 0.6,
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
    },
    forgetPasswordTextStyle: {
      marginTop: Sizes.fixPadding - 5.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
      textAlign: "right",
      textDecorationLine: "underline",
      ...Fonts.primaryColor14Medium,
    },
    registerButtonStyle: {
      marginTop: (Sizes.fixPadding * 4.0 * height) / 880,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: Sizes.fixPadding * 2.0,
      borderRadius: Sizes.fixPadding - 5.0,
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
    agreeOrNotInfoWrapStyle: {
      marginVertical: Sizes.fixPadding,
      marginHorizontal: Sizes.fixPadding * 2.0,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    checkBoxStyle: {
      width: 18.0,
      height: 18.0,
      borderRadius: Sizes.fixPadding - 8.0,
      borderWidth: 1.0,
      alignItems: "center",
      justifyContent: "center",
      marginRight: Sizes.fixPadding + 2.0,
    },
  });
}

export default RegisterScreen;

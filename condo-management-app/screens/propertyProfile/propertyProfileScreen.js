import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { ThemedButton } from "react-native-really-awesome-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/FontAwesome5";

import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Button,
  Alert,
  Image,
  Linking,
  Animated,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import useAuth from "../../hooks/useAuth";

const PropertyProfileScreen = ({ navigation }) => {
  const [wasPopped, setWasPopped] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = windowDimensions;
  const styles = createStyles(height);
  const { addProperty, userValues, addPropertyFile } = useAuth();

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const [state, setState] = useState({
    propertyName: "",
    unitCount: "",
    parkingCount: "",
    lockerCount: "",
    Address: "",
  });

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
  const addPropertyProfile = () => {
    const cleanedState = CleanUndefinedEntries({ ...state });
    addProperty(cleanedState);
  };

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const handleFile = async (propertyId) => {
    let result = await DocumentPicker.getDocumentAsync({
      // accept pdf
      type: "application/pdf",
    });

    if (!result.canceled) {
      const dataForm = new FormData();
      const assets = result.assets;
      if (!assets) return;

      const file = assets[0];
      dataForm.append("file", file.file);
      dataForm.append("propertyID", propertyId);
      dataForm.append("fileType", "condo-file");
      addPropertyFile(dataForm);
    }
  };

  const handleCondoPicture = async (propertyId) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/image",
    });

    if (!result.canceled) {
      const dataForm = new FormData();
      const assets = result.assets;
      if (!assets) return;

      const file = assets[0];
      dataForm.append("file", file.file);
      dataForm.append("propertyID", propertyId);
      dataForm.append("fileType", "condoimage");
      addPropertyFile(dataForm);
    }
  };

  const downloadFile = (fileUrl) => {
    Linking.canOpenURL(fileUrl)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + fileUrl);
        } else {
          return Linking.openURL(fileUrl);
        }
      })
      .catch((err) =>
        console.error("An error occurred downloading the file", err)
      );
  };

  const titleMappings = {
    propertyName: "Property Name",
    Address: "Address",
    owner: "Owner",
    location: "Location",
    unitCount: "Unit Count",
    parkingCount: "Number of Parking Spots",
    lockerCount: "Number of Lockers",
  };

  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleExpansion = () => {
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue: expanded ? 0 : 475,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const addFilesToProperty = () => {
    return Object.keys(userValues.propertiesOwned).map((propertyId) => (
      <View
        key={propertyId}
        style={{
          padding: 10,
          backgroundColor: Colors.bodyBackColor,
          borderBottomColor: "#000",
          borderBottomWidth: 0,
          height: width > 600 ? 400 : 925,
          marginBottom: 10,
          borderRadius: 10,
          elevation: 2,
          elevation: 2, // This adds a subtle shadow on Android
          shadowOpacity: 0.2, // This adds a subtle shadow on iOS
          shadowRadius: 10,
          shadowColor: "black",
          shadowOffset: { height: 2, width: 0 },
          shadowOffset: { width: 2, height: 2 },
          flexDirection: width > 600 ? "row" : "column",
          position: "relative",
        }}
      >
        <View style={{ justifyContent: "center", flexWrap: "wrap",  }}>
          <TouchableOpacity
            onPress={() => handleCondoPicture(propertyId)}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri:
                  userValues.propertiesOwned[propertyId].files?.condoimage ||
                  "https://placehold.co/400x400?text=Upload+Image",
              }}
              style={{
                width: width > 600 ? 250 : width * 0.8, // Adjust image width based on screen size
                height: width > 600 ? 250 : width * 0.8, // Adjust image height based on screen size
                margin: 20,
                resizeMode: "cover",
                borderRadius: 10,
                elevation: 5,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 20,
            width: "100%",
            marginLeft: width > 600 ? 0 : 20,
          }}
        >
          {Object.entries(userValues.propertiesOwned[propertyId]).map(
            ([key, value]) => {
              if (key !== "files" && titleMappings[key]) {
                const formattedValue =
                  typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : value.toString();
                return (
                  <View key={key} style={styles.propertyItem}>
                    <Text style={styles.sizing}>{titleMappings[key]}:</Text>
                    <Text style={styles.content}>{formattedValue}</Text>
                  </View>
                );
              } else if (key === "files" && value["condo-file"]) {
                // Targeting only the 'condo-file'
                const file = value["condo-file"];
                return (
                  <View
                    key={"condo-file"}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text style={styles.sizing}>Condo File(s):</Text>
                    <TouchableOpacity onPress={() => downloadFile(file)}>
                      <Text style={styles.sizingUnderline}>View</Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                return null; // In case there's no 'condo-file'
              }
            }
          )}
          <Text
            key="id"
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "white",
              marginRight: 10,
            }}
          >
            Property ID: {propertyId}
          </Text>

          <View
            style={{
              flexDirection: width > 500 ? "row" : "column",
              marginTop: 25,
              flexWrap: "wrap",
            }}
          >
            <ThemedButton
              name="bruce"
              type="primary"
              width={width > 600 ? width * 0.2 : width * 0.8}
              raiseLevel={2}
              borderRadius={10}
              style={{
                marginRight: 20,
                alignSelf: "flex-start",
                borderRadius: 5,
                padding: 10,
              }}
              onPress={() =>
                navigation.navigate("PropertyScreen", { propertyId })
              }
            >
              <MaterialIcon
                style={{ marginRight: 5 }}
                name="eye"
                size={26}
                color="#fff"
              />
              <Text
                style={{
                  ...Fonts.primaryColor14Medium,
                  color: Colors.whiteColor,
                }}
              >
                View Listing
              </Text>
            </ThemedButton>

            <ThemedButton
              name="bruce"
              type="primary"
              raiseLevel={2}
              borderRadius={10}
              width={width > 600 ? width * 0.2 : width * 0.8}
              style={{
                marginRight: 20,
                alignSelf: "flex-start",
                borderRadius: 5,
                padding: 10,
              }}
              onPress={async () => await handleFile(propertyId)}
            >
              <Image
                source={require("../../assets/images/icons/upload_icon.png")}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 5,
                  tintColor: "#fff",
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  ...Fonts.primaryColor14Medium,
                  color: Colors.whiteColor,
                }}
              >
                Download Files
              </Text>
            </ThemedButton>
          </View>
        </View>
      </View>
    ));
  };

  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: height }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={{ margin: 10, alignContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  ...Fonts.whiteColor30SemiBold,
                }}
              >
                Manage Your Properties
              </Text>
              <ThemedButton
                name="bruce"
                type="primary"
                width={width * 0.2}
                style={{
                  marginRight: 20,
                  alignSelf: "flex-start",
                  raiseLevel: 2,
                  borderRadius: 5,
                  padding: 10,
                }}
                onPress={() => toggleExpansion()}
              >
                <Icon name="add-circle-outline" size={30} color="white" />
              </ThemedButton>
            </View>

            <TouchableOpacity>
              <Animated.View style={{ height: animation, overflow: "scroll" }}>
                <View
                  style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}
                >
                  <View style={{ flex: 1, marginBottom: 15 }}>
                    <View>
                      <View style={styles.textFieldWrapStyle}>
                        <TextInput
                          width={0.8 * width}
                          onChangeText={(value) =>
                            updateState({ propertyName: value })
                          }
                          placeholder="Property Name"
                          value={state.propertyName}
                          placeholderTextColor={Colors.grayColor}
                          style={{
                            ...Fonts.whiteColor16Medium,
                            flex: 1,
                            marginLeft: Sizes.fixPadding + 2.0,
                            paddingVertical:
                              ((Sizes.fixPadding + 7.0) * height) / 880,
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
                          style={{
                            ...Fonts.parentColor14Medium,
                            color: Colors.errorColor,
                          }}
                        ></Text>
                      </View>

                      <View>
                        <View style={styles.textFieldWrapStyle}>
                          <TextInput
                            width={0.9 * width}
                            onChangeText={(value) =>
                              updateState({ unitCount: value })
                            }
                            placeholder="Unit Count"
                            value={state.unitCount}
                            placeholderTextColor={Colors.grayColor}
                            style={{
                              ...Fonts.whiteColor16Medium,
                              flex: 1,
                              marginLeft: Sizes.fixPadding + 2.0,
                              paddingVertical:
                                ((Sizes.fixPadding + 7.0) * height) / 880,
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
                            style={{
                              ...Fonts.parentColor14Medium,
                              color: Colors.errorColor,
                            }}
                          ></Text>
                        </View>
                      </View>
                      <View>
                        <View style={styles.textFieldWrapStyle}>
                          <TextInput
                            width={0.9 * width}
                            onChangeText={(value) =>
                              updateState({ Address: value })
                            }
                            placeholder="Address"
                            value={state.Address}
                            placeholderTextColor={Colors.grayColor}
                            style={{
                              ...Fonts.whiteColor16Medium,
                              flex: 1,
                              marginLeft: Sizes.fixPadding + 2.0,
                              paddingVertical:
                                ((Sizes.fixPadding + 7.0) * height) / 880,
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
                            style={{
                              ...Fonts.parentColor14Medium,
                              color: Colors.errorColor,
                            }}
                          ></Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View>
                        <View style={styles.textFieldWrapStyle}>
                          <TextInput
                            width={0.9 * width}
                            onChangeText={(value) =>
                              updateState({ parkingCount: value })
                            }
                            placeholder="Parking Count"
                            value={state.parkingCount}
                            placeholderTextColor={Colors.grayColor}
                            style={{
                              ...Fonts.whiteColor16Medium,
                              flex: 1,
                              marginLeft: Sizes.fixPadding + 2.0,
                              paddingVertical:
                                ((Sizes.fixPadding + 7.0) * height) / 880,
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
                            style={{
                              ...Fonts.parentColor14Medium,
                              color: Colors.errorColor,
                            }}
                          ></Text>
                        </View>
                      </View>
                      <View>
                        <View style={styles.textFieldWrapStyle}>
                          <TextInput
                            width={0.9 * width}
                            onChangeText={(value) =>
                              updateState({ lockerCount: value })
                            }
                            placeholder="Locker Count"
                            value={state.lockerCount}
                            placeholderTextColor={Colors.grayColor}
                            style={{
                              ...Fonts.whiteColor16Medium,
                              flex: 1,
                              marginLeft: Sizes.fixPadding + 2.0,
                              paddingVertical:
                                ((Sizes.fixPadding + 7.0) * height) / 880,
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
                            style={{
                              ...Fonts.parentColor14Medium,
                              color: Colors.errorColor,
                            }}
                          ></Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View></View>
                </View>
                <View>
                  <ThemedButton
                    name="bruce"
                    type="primary"
                    style={[
                      { marginLeft: 15, marginRight: 20, marginBottom: 20 },
                    ]}
                    onPress={() => addPropertyProfile()}
                    raiseLevel={2}
                    textSize={20}
                    borderRadius={5}
                    width={width * 0.25}
                  >
                    <Text
                      style={{
                        ...Fonts.primaryColor22SemiBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      Add Property
                    </Text>
                  </ThemedButton>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 30,
            }}
          >
            <Text
              style={{
                ...Fonts.whiteColor20SemiBold,
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              Listed Properties
            </Text>
            <ScrollView
              horizontal={false}
              style={{
                height: height * 0.85,
                marginBottom: 55,
              }}
            >
              {"propertiesOwned" in userValues && addFilesToProperty()}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );

  if (Platform.OS === "web") {
    return content;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
        {content}
      </SafeAreaView>
    );
  }
};

export default PropertyProfileScreen;

function createStyles(height) {
  return StyleSheet.create({
    textFieldWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
      paddingVertical: (Sizes.fixPadding + 2.0) / 2.0,
    },

    propertyItem: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
      flexWrap: "wrap",
    },
    title: {
      fontWeight: "600",
      color: "white",
      marginRight: 10,
    },
    value: {
      color: "white",
    },

    sizing: {
      fontSize: 18,
      fontWeight: "600",
      color: "white",
      marginRight: 6,
    },

    sizingUnderline: {
      fontSize: 18,
      color: "white",
      marginRight: 6,
      textDecorationLine: "underline",
    },

    content: {
      fontSize: 16,
      color: "white",
    },
  });
}

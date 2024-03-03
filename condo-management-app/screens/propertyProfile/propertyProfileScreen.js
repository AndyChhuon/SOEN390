import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { ThemedButton } from "react-native-really-awesome-button";
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

    // Start animation on height change
    Animated.timing(animation, {
      toValue: expanded ? 0 : 400, // Toggle between 0 and 100 height
      duration: 500, // Animation duration
      useNativeDriver: false, // Height does not support native driver
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
          marginBottom: 10,
          borderRadius: 10,
          elevation: 2,
          flexDirection: "row", // Align children horizontally
        }}
      >
        {/* Image to the left with height matching its parent */}
        <View style={{ height: "100%", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => handleCondoPicture(propertyId)}>
            <Image
              source={{
                uri: userValues.propertiesOwned[propertyId].files
                  ? userValues.propertiesOwned[propertyId].files.condoimage
                  : "https://placehold.co/400x400?text=Upload+Image",
              }}
              style={{
                width: 250,
                height: 250,
                margin: 20,
                resizeMode: "cover",
                borderRadius: 10,
                elevation: 5,
              }} // Added border for visibility
            />
          </TouchableOpacity>
        </View>

        {/* Content on the right */}
        <View style={{ flex: 1, marginTop: 20 }}>
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

          <TouchableOpacity onPress={async () => await handleFile(propertyId)}>
            <Image
              source={require("../../assets/images/icons/upload_icon.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
                resizeMode: "contain",
                marginTop: 20,
              }} // Added border for visibility
            />
          </TouchableOpacity>
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
            <Text
              style={{
                ...Fonts.whiteColor30SemiBold,
                margin: 20,
                marginBottom: 40,
                alignSelf: "left",
              }}
            >
              Manage Your Properties
            </Text>
            <View
              style={{
                margin: 15,
                alignContent: "center",
                backgroundColor: Colors.bodyBackColor,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end", // Align children to the right.
                  alignItems: "flex-start", // Align children to the top.
                  borderRadius: 10,
                  margin: 15,
                }}
              >
                <TouchableOpacity onPress={() => toggleExpansion()}>
                  <Image
                    source={require("../../assets/images/icons/add.png")}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      borderRadius: 10,
                      tintColor: "white",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Animated.View
                  style={{ height: animation, overflow: "hidden" }}
                >
                  <View
                    style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}
                  >
                    <View style={{ flex: 1, marginBottom: 15 }}>
                      <View>
                        <View style={styles.textFieldWrapStyle}>
                          <TextInput
                            width={0.9 * width}
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
                      type="secondary"
                      style={[
                        { marginLeft: 20, marginRight: 20, marginBottom: 20 },
                      ]}
                      onPress={() => addPropertyProfile()}
                      raiseLevel={2}
                      fontSize={16}
                      textSize={16}
                      borderRadius={5}
                      width={width * 0.2}
                    >
                      Add Property
                    </ThemedButton>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>
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
    },

    propertyItem: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
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

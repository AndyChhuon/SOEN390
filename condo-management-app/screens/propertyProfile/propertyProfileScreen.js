import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";

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
} from "react-native";
import { IoMdPerson } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
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
      dataForm.append("fileType", "condo-file-test");
      addPropertyFile(dataForm);
    }
  };

  const addFilesToProperty = () => {
    return Object.keys(userValues.propertiesOwned).map((propertyId) => (
      <View
        key={propertyId}
        style={{
          marginRight: 20,
          padding: 20,
          border: "1px solid white",
        }}
      >
        <Text
          key="id"
          style={{
            color: "white",
          }}
        >
          id: {propertyId}
        </Text>
        {Object.entries(userValues.propertiesOwned[propertyId]).map(
          ([key, value]) => {
            if (key !== "files") {
              return (
                <Text
                  key={key}
                  style={{
                    color: "white",
                  }}
                >
                  {key}: {JSON.stringify(value)}
                </Text>
              );
            } else {
              return Object.entries(value).map(([fileId, file]) => {
                return (
                  <Text
                    key={fileId}
                    style={{
                      color: "white",
                    }}
                  >
                    {fileId}: {JSON.stringify(file)}
                  </Text>
                );
              });
            }
          }
        )}

        <View>
          <Button
            title="pick file"
            onPress={() => handleFile(propertyId)}
          ></Button>
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
          <View>
            <View
              style={{
                ...Cards.card,
                width: width * 0.9,
                alignSelf: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <FaHouse style={{ color: Colors.whiteColor }} />
                <Text
                  style={{
                    ...Fonts.whiteColor20SemiBold,
                    margin: 10,
                    alignSelf: "center",
                  }}
                >
                  Property Profile System
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", height: "auto" }}>
                <View style={{ flex: 1 }}>
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
                          ...Fonts.whiteColor14Medium,
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
                          updateState({ unitCount: value })
                        }
                        placeholder="Unit Count"
                        value={state.unitCount}
                        placeholderTextColor={Colors.grayColor}
                        style={{
                          ...Fonts.whiteColor14Medium,
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
                          ...Fonts.whiteColor14Medium,
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
                          ...Fonts.whiteColor14Medium,
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
                          ...Fonts.whiteColor14Medium,
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
              <View>
                <Button
                  title="Add property"
                  onPress={addPropertyProfile}
                ></Button>
              </View>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            style={{
              backgroundColor: Colors.bodyBackColor,
              height: "auto",
              width: width * 0.9,
              alignSelf: "center",
            }}
          >
            {"propertiesOwned" in userValues && addFilesToProperty()}
          </ScrollView>
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
  });
}

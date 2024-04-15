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

const myRentedProperties = ({ navigation }) => {
  const { getRentedProperties, newRentInitiated } = useAuth();
  const [properties, setProperties] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = windowDimensions;
  const styles = createStyles(height);

  useEffect(() => {
    getRentedProperties(setProperties);
  }, [newRentInitiated]);

  const titleMappings = {
    propertyName: "Property Name",
    Address: "Address",
    owner: "Owner",
    location: "Location",
    unitCount: "Unit Count",
    parkingCount: "Number of Parking Spots",
    lockerCount: "Number of Lockers",
  };

  const displayProperties = () => {
    console.log(properties);
    return Object.keys(properties).map((propertyId) => {
      return (
        <View
          key={propertyId}
          style={{
            padding: 20,
            backgroundColor: Colors.cardmaincolor,
            borderBottomColor: "#000",
            borderBottomWidth: 0,
            height: width > 900 ? height * 0.6 : height * 0.95,
            marginBottom: 10,
            borderRadius: 10,
            elevation: 2,
            elevation: 2,
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowColor: "black",
            shadowOffset: { height: 2, width: 0 },
            shadowOffset: { width: 2, height: 2 },
            flexDirection: width > 900 ? "row" : "column",
            position: "relative",
            alignContent: "center",
          }}
        >
          <View style={{ justifyContent: "center", flexWrap: "wrap" }}>
            <Image
              source={{
                uri:
                  properties[propertyId].files?.condoimage ||
                  "https://placehold.co/400x400",
              }}
              style={{
                marginHorizontal: 30,
                alignSelf: "center",
                width: width > 900 ? 400 : "90%",
                height: width > 900 ? 400 : width * 0.45,
                resizeMode: "cover",
                borderRadius: 10,
                elevation: 5,
              }}
            />
          </View>

          <View
            style={{
              marginVertical: width > 900 ? 70 : 20,
              marginHorizontal: width > 900 ? 60 : 20,
            }}
          >
            {Object.entries(properties[propertyId]).map(([key, value]) => {
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
                return null;
              }
            })}
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
                flexDirection: width > 900 ? "row" : "column",
                flexWrap: "wrap",
                marginVertical: 20,
                bottom: 0,
                alignContent: "center",
              }}
            >
              <ThemedButton
                name="bruce"
                type="primary"
                raiseLevel={2}
                borderRadius={10}
                width={width > 900 ? width * 0.2 : width * 0.8}
                style={{
                  marginVertical: 10,
                  alignSelf: "flex-start",
                  borderRadius: 5,
                  padding: 10,
                }}
                onPress={() =>
                  navigation.navigate("PropertyScreen", {
                    propertyId,
                    propertyDetails: properties[propertyId],
                  })
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
                    ...Fonts.primaryColor16SemiBold,
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
                width={width > 900 ? width * 0.2 : width * 0.8}
                style={{
                  marginVertical: 10,
                  alignSelf: "flex-start",
                  borderRadius: 5,
                }}
                onPress={() =>
                  navigation.navigate("reservationScreen", {
                    propertyId,
                    activity: "gym",
                  })
                }
              >
                <MaterialIcon
                  style={{ marginRight: 5 }}
                  name="dumbbell"
                  size={26}
                  color="#fff"
                />
                <Text
                  style={{
                    ...Fonts.primaryColor16SemiBold,
                    color: Colors.whiteColor,
                  }}
                >
                  Reserve Gym
                </Text>
              </ThemedButton>
              <ThemedButton
                name="bruce"
                type="primary"
                raiseLevel={2}
                borderRadius={10}
                width={width > 900 ? width * 0.2 : width * 0.8}
                style={{
                  marginVertical: 10,
                  alignSelf: "flex-start",
                  borderRadius: 5,
                }}
                onPress={() =>
                  navigation.navigate("reservationScreen", {
                    propertyId,
                    activity: "pool",
                  })
                }
              >
                <MaterialIcon
                  style={{ marginRight: 5 }}
                  name="swimming-pool"
                  size={26}
                  color="#fff"
                />
                <Text
                  style={{
                    ...Fonts.primaryColor16SemiBold,
                    color: Colors.whiteColor,
                  }}
                >
                  Reserve Pool
                </Text>
              </ThemedButton>
            </View>
          </View>
        </View>
      );
    });
  };

  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, height: height }}
      >
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
                My rented properties
              </Text>
            </View>
          </View>
          <View
            style={{
              margin: 30,
            }}
          >
            <Text
              style={{
                ...Fonts.whiteColor22Bold,
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              My Properties
            </Text>
            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              style={{
                height: height * 0.85,
                marginBottom: 55,
              }}
            >
              {properties && displayProperties()}
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

export default myRentedProperties;

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
      fontSize: 18,
      color: "white",
    },
  });
}

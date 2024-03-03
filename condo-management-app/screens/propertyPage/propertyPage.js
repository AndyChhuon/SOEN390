import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import useAuth from "../../hooks/useAuth";
import { ThemedButton } from "react-native-really-awesome-button";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const PropertyScreen = ({ route, navigation }) => {
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = windowDimensions;
  const styles = createStyles(width, height);
  const { userValues } = useAuth();
  const [wasPopped, setWasPopped] = useState(false);

  const propertyId = route?.params?.propertyId;

  const propertyDetails = userValues.propertiesOwned[propertyId];

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  function backArrow() {
    return (
      <View style={[{margin:10}, { ...styles.backArrowWrapStyle }]}>
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

  if (!propertyDetails) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.screenTitle}>Property not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {backArrow()}
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.screenTitle}>
            {propertyDetails.propertyName || "Property Name"}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  propertyDetails.files?.condoimage ||
                  "https://placehold.co/400x400?text=Upload+Image",
              }}
              style={styles.propertyImage}
            />
            <FlatList
              data={propertyDetails.files?.condoImages || []}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.gridImage} />
              )}
              contentContainerStyle={styles.gridContainer}
            />
            <TouchableOpacity
              style={styles.overlapButton}
              onPress={() => console.log("Button pressed")}
            >
              <Text style={styles.buttonText}>Show all photos</Text>
            </TouchableOpacity>
          </View>
          <Text style={[{ marginLeft: 15 }, Fonts.whiteColor22SemiBold]}>
            Condos in Montreal, Quebec
          </Text>

          <View style={styles.propertyDetails}>
            <Text style={styles.detailText}>
              {[
                propertyDetails.unitCount
                  ? `${propertyDetails.unitCount} units`
                  : "",
                propertyDetails.parkingCount
                  ? `${propertyDetails.parkingCount} parking spots`
                  : "",
                propertyDetails.lockerCount
                  ? `${propertyDetails.lockerCount} lockers`
                  : "",
              ]
                .filter((detail) => detail)
                .join(", ")}
            </Text>
            {propertyDetails.Address && (
              <Text style={[styles.detailText, styles.address]}>
                {`Address: ${propertyDetails.Address}`}
              </Text>
            )}
          </View>

          <View style={styles.container}>
            <Text style={styles.pricePerNight}>$1,306 CAD night</Text>

            <View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>CHECK-IN</Text>
                <Text style={styles.dateText}>CHECKOUT</Text>
              </View>

              <View style={styles.dateContainer}>
                <Text style={styles.dateValue}>3/17/2024</Text>
                <Text style={styles.dateValue}>3/22/2024</Text>
              </View>
            </View>

            <View style={styles.guestContainer}>
              <Text style={styles.guestText}>GUESTS</Text>
              <Text style={styles.guestValue}>1 guest</Text>
            </View>

            <View style={styles.feeDetails}>
              <Text style={styles.feeText}>$1,306 CAD x 5 nights</Text>
              <Text style={styles.feeValue}>$6,530 CAD</Text>
            </View>

            <View style={styles.feeDetails}>
              <Text style={styles.feeText}>Cleaning fee</Text>
              <Text style={styles.feeValue}>$720 CAD</Text>
            </View>

            <View style={styles.feeDetails}>
              <Text style={styles.feeText}>CMC service fee</Text>
              <Text style={styles.feeValue}>$1,177 CAD</Text>
            </View>

            <View style={styles.feeDetails}>
              <Text style={styles.feeText}>Taxes</Text>
              <Text style={styles.feeValue}>$1,339 CAD</Text>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>$9,766 CAD</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function createStyles(width, height) {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: Colors.bodyBackColor2,
    },
    scrollView: {
      flexGrow: 1,
      height: height * 0.8,
      width: width * 0.99,
    },
    screenTitle: {
      ...Fonts.whiteColor30SemiBold,
      margin: 20,
    },
    propertyImage: {
      width: "100%",
      height: 250,
      borderRadius: 10,
      margin: 15,
    },
    propertyDetails: {
      padding: 15,
    },
    detailText: {
      ...Fonts.grayColor16Regular,
      marginVertical: 4,
    },
    imageContainer: {
      position: "relative",
      marginBottom: 15,
    },
    propertyImage: {
      width: "100%",
      height: 250,
      borderRadius: 10,
      marginHorizontal: 15,
    },
    overlapButton: {
      position: "absolute",
      right: 15,
      bottom: 20,
      padding: 7,
      backgroundColor: "white",
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
    },
    buttonText: {
      color: "black",
      fontWeight: 600,
    },
    address: {
      color: "white",
      fontWeight: "600",
    },
    container: {
      backgroundColor: Colors.bodyBackColor,
      borderRadius: 8,
      padding: 16,
      left: 5,
      right: 5,
      alignContent: "center",
      alignSelf: "center",
      elevation: 2, // This adds a subtle shadow on Android
      shadowOpacity: 0.2, // This adds a subtle shadow on iOS
      shadowRadius: 10,
      shadowColor: "black",
      shadowOffset: { height: 2, width: 0 },
      width: width * 0.95,
      shadowOffset: { width: 2, height: 2 },
      margin: 16,
      color: "white",
    },
    pricePerNight: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
      color: "white",
    },
    dateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    dateText: {
      fontWeight: "600",
      color: "white",
    },
    dateValue: {
      fontWeight: "300",
      color: "white",
    },
    guestContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    guestText: {
      fontWeight: "600",
      color: "white",
    },
    guestValue: {
      fontWeight: "600",
      color: "white",
    },
    reserveButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 18,
    },
    chargeNotice: {
      fontSize: 14,
      color: "gray",
      marginBottom: 16,
    },
    feeDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    feeText: {
      color: "white",
    },
    feeValue: {
      fontWeight: "600",
      color: "white",
    },
    totalContainer: {
      borderTopColor: "lightgray",
      borderTopWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 16,
      marginTop: 16,
    },
    totalText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
    },
    totalValue: {
      fontWeight: "bold",
      fontSize: 18,
      color: "white",
    },

    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  });
}

export default PropertyScreen;

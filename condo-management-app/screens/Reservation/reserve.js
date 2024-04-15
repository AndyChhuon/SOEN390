import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 ScrollView,
 SafeAreaView,
 TouchableWithoutFeedback,
 Dimensions,
 KeyboardAvoidingView,
 Platform,
 Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const Reserve = ({ route }) => {
 const navigation = useNavigation();
 const propertyId = route?.params?.propertyId;
 const [windowDimensions, setWindowDimensions] = useState(
  Dimensions.get("window")
 );
 const { width, height } = windowDimensions;
 const styles = createStyles(width, height);

 useEffect(() => {
  const onChange = ({ window }) => {
   setWindowDimensions(window);
  };
  Dimensions.addEventListener("change", onChange);
  return () => Dimensions.removeEventListener("change", onChange);
 }, []);

 const facilities = [
  {
   id: 1,
   name: "Swimming Pool",
   description:
    "Enjoy our Olympic standard swimming pool with lessons and a kids' pool.",
   image: require("../../assets/images/swimming.png"),
   activity: "pool",
  },
  {
   id: 2,
   name: "Gym",
   description:
    "Our gym features modern equipment and a free sauna for relaxation post-workout.",
   image: require("../../assets/images/gym.png"),
   activity: "gym",
  },
  {
   id: 3,
   name: "Spa",
   description:
    "Our Spa offers a range of services including massages and beauty treatments.",
   image: require("../../assets/images/spa.png"),
   activity: "spa",
  },
 ];

  const renderFacilityCards = () => {
    return facilities.map((facility) => (
      <TouchableOpacity
        key={facility.id}
        style={styles.facilityCard}
        onPress={() => {}}
      >
        <Text style={styles.facilityTitle}>{facility.name}</Text>
        <Image
          source={facility.image}
          style={styles.facilityImage}
          resizeMode="contain"
        />
        <Text style={styles.facilityDescription}>{facility.description}</Text>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() =>
            navigation.navigate("reservationScreen", {
              propertyId,
              activity: facility.activity,
            })
          }
        >
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ));
  };

 const content = (
  <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2, flex: 1 }}>
   <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={{ paddingHorizontal: 20 }}>
     {backArrow()}
     <Text style={styles.pageTitle}>Reserve Facilities</Text>
     <View style={styles.facilityContainer}>{renderFacilityCards()}</View>
    </View>
   </ScrollView>
  </SafeAreaView>
 );

 if (Platform.OS === "web") {
  return content;
 } else {
  return (
   <TouchableWithoutFeedback onPress={() => {}}>
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
     {content}
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
 }
};

const createStyles = (width, height) => {
 const isSmallScreen = width < 600;
 const cardWidthPercentage = isSmallScreen ? 90 : 30;
 const cardMargin = isSmallScreen ? 10 : 20;

 return StyleSheet.create({
  facilityContainer: {
   flexDirection: "row",
   flexWrap: "wrap",
   justifyContent: "space-around",
   alignItems: "center",
  },
  facilityCard: {
   width: `80%`,
   backgroundColor: Colors.cardmaincolor,
   borderRadius: 10,
   padding: Sizes.cardPadding,
   margin: cardMargin,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
  },
  facilityTitle: {
   ...Fonts.whiteColor20SemiBold,
   marginBottom: 10,
  },
  facilityImage: {
   width: "100%",
   height: 200, // Fixed height for consistent image display
   marginBottom: 10,
  },
  facilityDescription: {
   ...Fonts.whiteColor16Medium,
   minHeight: 60, // Ensures all cards are of the same height
   marginBottom: 10,
  },
  reserveButton: {
   backgroundColor: "#444",
   paddingVertical: 8,
   paddingHorizontal: 20,
   borderRadius: 5,
   alignSelf: "center",
  },
  reserveButtonText: {
   ...Fonts.whiteColor16Medium,
  },
  pageTitle: {
   ...Fonts.whiteColor30SemiBold,
   marginTop: 20,
   marginBottom: 20,
   textAlign: "center",
  },
  scrollViewContent: {
   flexGrow: 1,
   paddingBottom: 20,
  },
  backArrowWrapStyle: {
   margin: 10,
  },
 });
};

export default Reserve;

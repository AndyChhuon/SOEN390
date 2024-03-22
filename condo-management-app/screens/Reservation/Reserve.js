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
  Image
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';


const Reserve = () => {
  const navigation = useNavigation();
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

  const goBack = () => {
    navigation.goBack("PropertyScreen");
  };


  //dummy values , will be fetched from backend depending on each property id.
  const facilities = [
    {
      id: 1,
      name: "Swimming Pool",
      description:
        "Enjoy our Olympic standard swimming pool. We have swimming lessons, diving lessons for people looking to learn. We also have a kids pool for your smaller children to enjoy.",
        image: require("../../assets/images/swimming.png"),
    },
    {
      id: 2,
      name: "Gym",
      description:
      "Gain access to our Gym with 10+ treadmills and bicycles. We are well equipped with weights, barbell, dumbbells, etc so that everyone can perform their excercises without having to wait. We also have a free sauna to relac yourselves after your hard work!",
      image: require("../../assets/images/gym.png"),
    },
    {
      id: 3,
      name: "Spa",
      description:
        "Welcome to our Spa! We have available sauna, whirlpool, jet bath, steam room,massage,mud bath,salt scrub, clay or herbal body masks, waxing for your relaxation.Our Spa also offers nail services, such as manicure, predicures and paraffin treatments",
        image: require("../../assets/images/spa.png"),
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
        <Image source={facility.image} style={styles.facilityImage} resizeMode="contain" />
        <Text style={styles.facilityDescription}>{facility.description}</Text>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => {}}
        >
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ));
  };

  const content =  (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2, flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
  <MaterialIcons name="arrow-back" style={styles.goBackButtonIcon} />
</TouchableOpacity>
        <Text
          style={{
            ...Fonts.whiteColor20SemiBold,
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Reserve Facilities
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centeredContainer}>
          <View style={styles.facilityContainer}>
            {renderFacilityCards()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  if (Platform.OS === "web") {
    return content;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => {}}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}
        >
          {content}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

const createStyles = (width, height) => {
    const isSmallScreen = width < 600;
    const cardWidthPercentage = isSmallScreen ? 90 : 30;
    const cardWidth = (width * cardWidthPercentage) / 100;
  
    return StyleSheet.create({
      centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      facilityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center", 
      },
      facilityCard: {
        width: cardWidth,
        backgroundColor: Colors.cardmaincolor,
        borderRadius: Sizes.cardRadius,
        padding: Sizes.cardPadding,
        marginHorizontal: 2,
        marginBottom: 10,
      },
      facilityTitle: {
        ...Fonts.whiteColor20SemiBold,
        marginBottom: 10,
        padding: 11,
      },
      facilityImage: {
        width: "100%",
        height: 150, 
        marginBottom: 10,
        resizeMode: "cover", 
      },
      facilityDescription: {
        ...Fonts.whiteColor16Medium,
        height: 100,
        padding: 10,
        marginBottom: 10,
      },
      reserveButton: {
        backgroundColor: "#444",
        paddingVertical: 8,
        paddingHorizontal: 20, 
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center",
        alignItems: "center",
      },
      reserveButtonText: {
        ...Fonts.whiteColor16Medium,
      },
      goBackButton: {
        position: "absolute",
        top: 20,
        left: 20,
      },
      goBackButtonIcon: {
        color: Colors.whiteColor,
        fontSize: 24,
      },
      
      scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 20,
      },
    });
  };
  

export default Reserve;

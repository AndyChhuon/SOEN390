import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { ThemedButton } from "react-native-really-awesome-button";
import { MaterialIcons } from "@expo/vector-icons";

import {
 SafeAreaView,
 View,
 Dimensions,
 StyleSheet,
 Text,
 KeyboardAvoidingView,
 Platform,
 ScrollView,
} from "react-native";
import useAuth from "../../hooks/useAuth";
import { DatePickerModal } from "react-native-paper-dates";

const reservationScreen = ({ route, navigation }) => {
 const { getPropertyAvailableTimes, addScheduledActivity, userValues } =
  useAuth();
 const [date, setDate] = React.useState(undefined);
 const [times, setTimes] = React.useState([]);
 const [selectedTimes, setSelectedTimes] = React.useState([]);

 const propertyId = route?.params?.propertyId;
 const activity = route?.params?.activity;

 const onDismissSingle = React.useCallback(() => {
  setDate(new Date());
 }, []);

 const onConfirmSingle = React.useCallback(
  (params) => {
   setDate(params.date);
  },
  [setDate]
 );
 const [wasPopped, setWasPopped] = useState(false);

 function backArrow() {
  return (
   <View style={[{ margin: 10 }, { ...styles.backArrowWrapStyle }]}>
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

 const [windowDimensions, setWindowDimensions] = useState(
  Dimensions.get("window")
 );
 const { width, height } = windowDimensions;

 const scheduledActivities =
  userValues.renting?.[propertyId]?.scheduledActivities?.[activity] ?? {};

 console.log(propertyId, activity);
 const styles = createStyles(height);

 const titleMappings = {
  propertyName: "Property Name",
  Address: "Address",
  owner: "Owner",
  location: "Location",
  unitCount: "Unit Count",
  parkingCount: "Number of Parking Spots",
  lockerCount: "Number of Lockers",
 };

 useEffect(() => {
  if (date) {
   const dateString =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");
   setTimes([]);
   setSelectedTimes([]);
   getPropertyAvailableTimes(propertyId, activity, dateString, setTimes);
  }
 }, [date]);

 console.log("Times: ", times);

 const content = (
  <SafeAreaView
   style={{ backgroundColor: Colors.bodyBackColor2, height: "100%" }}
  >
   <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ flexGrow: 1, height: height }}
   >
    <KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
     <View style={{ margin: 10, alignContent: "center" }}>
      {backArrow()}

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
        Reserve Activity
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
        marginTop: 5,
       }}
      >
       Property: {propertyId}
      </Text>
      <Text
       style={{
        ...Fonts.whiteColor20SemiBold,
        marginBottom: 10,
        marginTop: 5,
       }}
      >
       Activity: {activity}
      </Text>
      <Text
       style={{
        ...Fonts.whiteColor20SemiBold,
        marginBottom: 10,
        marginTop: 10,
       }}
      >
       {date
        ? " Date:" + date.toDateString()
        : "Please select a date to reserve the activity"}
      </Text>
      {date && (
       <ThemedButton
        name="bruce"
        type="primary"
        color={Colors.primaryColor}
        raiseLevel={2}
        borderRadius={10}
        width={width > 900 ? width * 0.2 : width * 0.8}
        style={{
         marginVertical: 10,
         alignSelf: "flex-start",
         borderRadius: 5,
         padding: 10,
        }}
        onPress={() => setDate(undefined)}
       >
        <Text
         style={{
          ...Fonts.whiteColor16SemiBold,
         }}
        >
         Change Date
        </Text>
       </ThemedButton>
      )}
     </View>
     <ScrollView style={{ margin: 30 }} horizontal={true}>
      {times.map((time) => (
       <ThemedButton
        name="bruce"
        backgroundColor={selectedTimes.includes(time) ? "grey" : "white"}
        type="secondary"
        raiseLevel={2}
        borderRadius={10}
        width={100}
        style={{
         marginVertical: 10,
         alignSelf: "flex-start",
         borderRadius: 5,
         padding: 10,
        }}
        onPress={() => {
         if (selectedTimes.includes(time)) {
          setSelectedTimes(selectedTimes.filter((t) => t !== time));
         } else {
          setSelectedTimes([...selectedTimes, time]);
         }
        }}
       >
        <Text>{time}</Text>
       </ThemedButton>
      ))}
     </ScrollView>
     {selectedTimes.length > 0 && (
      <View
       style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
       }}
      >
       <ThemedButton
        name="bruce"
        type="primary"
        raiseLevel={2}
        borderRadius={10}
        width={width * 0.8}
        style={{
         marginVertical: 10,
         alignSelf: "flex-start",
         borderRadius: 5,
         padding: 10,
        }}
        onPress={() => {
         const dateString =
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0");
         addScheduledActivity(
          propertyId,
          activity,
          dateString,
          selectedTimes,
          setTimes
         );
        }}
       >
        <Text
         style={{
          ...Fonts.whiteColor16SemiBold,
         }}
        >
         Reserve
        </Text>
       </ThemedButton>
      </View>
     )}
     <DatePickerModal
      mode="single"
      visible={!date}
      onDismiss={onDismissSingle}
      date={date}
      onConfirm={onConfirmSingle}
     />
     <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{
       marginBottom: 55,
      }}
     ></ScrollView>
     <View style={{ margin: 10, alignContent: "center" }}>
      <View
       style={{
        flexDirection: "column",
        margin: 20,
        marginBottom: 20,
       }}
      >
       <Text
        style={{
         ...Fonts.whiteColor30SemiBold,
        }}
       >
        My reserved activities
       </Text>
       {scheduledActivities &&
        Object.keys(scheduledActivities).map((date) => {
         return (
          <View>
           <Text
            style={{
             ...Fonts.whiteColor20SemiBold,
             marginBottom: 10,
             marginTop: 5,
            }}
           >
            {date}
           </Text>
           <ScrollView style={{ margin: 30 }} horizontal={true}>
            {Object.keys(scheduledActivities[date]).map((time) => {
             return (
              <Text
               style={{
                ...Fonts.whiteColor20SemiBold,
                marginHorizontal: 10,
               }}
              >
               {time}
              </Text>
             );
            })}
           </ScrollView>
          </View>
         );
        })}
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
   <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
    {content}
   </SafeAreaView>
  );
 }
};

export default reservationScreen;

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

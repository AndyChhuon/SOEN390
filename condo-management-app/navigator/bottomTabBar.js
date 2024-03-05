import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  BackHandler,
} from "react-native";
import { Colors, Sizes, Fonts } from "../constants/styles";
import NotificationPage from "../screens/Notifications_Page/notificationPage";
import ProfileScreen from "../screens/profile/profileScreen";
import ownerDashboard from "../screens/Dashboard/ownerDashboard";
import PropertyProfileScreen from "../screens/propertyProfile/propertyProfileScreen";
import financialSystemScreen from "../screens/financialSystem/financialSystemScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import PropertyScreen from "../screens/propertyPage/propertyPage";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const { reloadUser, isWaitingOnEmailVerification } = useAuth();
  const { height } = Dimensions.get("window");

  const styles = createStyles(height);
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useEffect(() => {
    if (route.params?.isExternal && isWaitingOnEmailVerification) {
      reloadUser();
    }
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.goldColor,
          tabBarInactiveTintColor: "#f9ac46",
          tabBarStyle: { ...styles.tabBarStyle },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name={"Profile"}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/user.png"),
                focused: focused,
                size: 38,
              }),
          }}
        />
        <Tab.Screen
          name={"propertyProfile"}
          component={PropertyProfileScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/home.png"),
                focused: focused,
                size: 38,
              }),
          }}
        />

        <Tab.Screen
          name={"FinancialSystem"}
          component={financialSystemScreen}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/finance.png"),
                focused: focused,
                size: 38,
              }),
          }}
        />

        <Tab.Screen
          name={"Notification"}
          component={NotificationPage}
          options={{
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/notification.png"),
                focused: focused,
                size: 32,
              }),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function tabIconSort({ icon, focused, size }) {
    return (
      <View
        style={{
          ...styles.bottomTabBarItemWrapStyle,
        }}
      >
        <Image
          source={icon}
          style={{
            tintColor: Colors.whiteColor,
            width: (size * height) / 880,
            height: (size * height) / 880,
            resizeMode: "contain",
          }}
        />
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={[styles.animatedView]}>
        <Text style={{ ...Fonts.whiteColor14Medium }}>
          Press back once again to exit
        </Text>
      </View>
    ) : null;
  }
};

function createStyles(height) {
  return StyleSheet.create({
    bottomTabBarItemWrapStyle: {
      width: (40.0 * height) / 880,
      height: (40.0 * height) / 880,
      marginBottom: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    animatedView: {
      backgroundColor: "#333333",
      position: "absolute",
      bottom: 40,
      alignSelf: "center",
      borderRadius: Sizes.fixPadding * 2.0,
      paddingHorizontal: Sizes.fixPadding + 5.0,
      paddingVertical: Sizes.fixPadding,
      justifyContent: "center",
      alignItems: "center",
    },
    tabBarStyle: {
      borderTopWidth: (2 * height) / 880,
      height: (70 * height) / 880,
      paddingTop: 15,
      paddingBott: 10,
      borderTopColor: "#7b8c95",
      elevation: (3.0 * height) / 880,
      shadowColor: Colors.primaryColor,
      backgroundColor: Colors.bodyBackColor,
    },
  });
}
export default TabNavigator;

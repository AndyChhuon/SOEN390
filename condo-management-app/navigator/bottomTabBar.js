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
import RequestPage from "../screens/Request/RequestPage";
import RentPropertiesScreen from "../screens/rentPropertiesScreen/rentPropertiesScreen";
import myRentedProperties from "../screens/myRentedProperties/myRentedProperties";
import employeeManagementScreen from "../screens/employeeManagement/employeeManagementScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const { user, userValues, reloadUser, isWaitingOnEmailVerification } = useAuth();

  const { height, width } = Dimensions.get("window");

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
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: true,
          tabBarLabelPosition: "below-icon",
        }}
      >
        <Tab.Screen
          name={"Profile"}
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, focused }) =>
              tabIconSort({
                icon: require("../assets/images/icons/user.png"),
                focused: focused,
                size: 38,
              }),
          }}
        />

        {userValues.userType === "renter" && (
          <Tab.Screen
            name={"myRentedProperties"}
            component={myRentedProperties}
            options={{
              tabBarLabel: "My Rented Properties",
              tabBarIcon: ({ color, focused }) =>
                tabIconSort({
                  icon: require("../assets/images/icons/home.png"),
                  focused: focused,
                  size: 32,
                }),
            }}
          />
        )}

        {userValues.userType === "renter" && (
          <Tab.Screen
            name={"rentPropertiesScreen"}
            component={RentPropertiesScreen}
            options={{
              tabBarLabel: "Rent a property",
              tabBarIcon: ({ color, focused }) =>
                tabIconSort({
                  icon: require("../assets/images/icons/finance.png"),
                  focused: focused,
                  size: 32,
                }),
            }}
          />
        )}

        {userValues.userType === "owner"
          && (
            <Tab.Screen
              name={"propertyProfile"}
              component={PropertyProfileScreen}
              options={{
                tabBarLabel: "Property Profiles",
                tabBarIcon: ({ color, focused }) =>
                  tabIconSort({
                    icon: require("../assets/images/icons/home.png"),
                    focused: focused,
                    size: 38,
                  }),
              }}
            />
          )}

        {userValues.userType === "CMC"
          && (
            <Tab.Screen
              name={"propertyProfile"}
              component={PropertyProfileScreen}
              options={{
                tabBarLabel: "Property Profiles",
                tabBarIcon: ({ color, focused }) =>
                  tabIconSort({
                    icon: require("../assets/images/icons/home.png"),
                    focused: focused,
                    size: 38,
                  }),
              }}
            />
          )}

          {userValues.userType === "CMC"
          && (
            <Tab.Screen
              name={"EmployeeManagement"}
              component={employeeManagementScreen}
              options={{
                tabBarLabel: "Employee Management",
                tabBarIcon: ({ color, focused }) =>
                  tabIconSort({
                    icon: require("../assets/images/icons/user.png"),
                    focused: focused,
                    size: 38,
                  }),
              }}
            />
          )}

        {userValues.userType === "admin"
          && (
            <Tab.Screen
              name={"propertyProfile"}
              component={PropertyProfileScreen}
              options={{
                tabBarLabel: "Property Profiles",
                tabBarIcon: ({ color, focused }) =>
                  tabIconSort({
                    icon: require("../assets/images/icons/home.png"),
                    focused: focused,
                    size: 38,
                  }),
              }}
            />
          )}

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

        {userValues.userType === "renter" && (
          <Tab.Screen
            name={"Request"}
            component={RequestPage}
            options={{
              tabBarLabel: "Make a Request",
              tabBarIcon: ({ color, focused }) =>
                tabIconSort({
                  icon: require("../assets/images/icons/request.png"),
                  focused: focused,
                  size: 32,
                }),
            }}
          />
        )}
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function tabIconSort({ icon, focused, size }) {
    return (
      <View style={styles.bottomTabBarItemWrapStyle}>
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
      height: (70 * height) / 880,
      paddingTop: 15,
      paddingBott: 10,
      elevation: (3.0 * height) / 880,
      backgroundColor: Colors.bodyBackColor,
    },
  });
}
export default TabNavigator;

import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import LoginScreen from "./auth/loginScreen";
import SignupScreen from "./auth/signupScreen";
import ProfileScreen from "./profile/profileScreen";
import NotificationPage from "./Notifications_Page/notificationPage";
import ownerDashboard from "./Dashboard/ownerDashboard";
import BottomTabBarScreen from "../navigator/bottomTabBar";
import PropertyProfileScreen from "./propertyProfile/propertyProfileScreen";
import financialSystemScreen from "./financialSystem/financialSystemScreen";
import PropertyScreen from "./propertyPage/propertyPage";
import LandingPage from "./LandingPage/landingPage";
import Terms from "./Terms/Terms";
import RequestPage from "./Request/RequestPage";
import ChatPage from "./Request/ChatPage";
import RentPropertiesScreen from "./rentPropertiesScreen/rentPropertiesScreen";
import myRentedProperties from "./myRentedProperties/myRentedProperties";
import reservationScreen from "./reservationScreen/reservationScreen";

const Stack = createStackNavigator();

const AppContent = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Register" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomTabBarScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="PropertyProfileScreen"
          component={PropertyProfileScreen}
        />
        <Stack.Screen
          name="rentPropertiesScreen"
          component={RentPropertiesScreen}
        />
        <Stack.Screen
          name="myRentedProperties"
          component={myRentedProperties}
        />
        <Stack.Screen name="reservationScreen" component={reservationScreen} />
        <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
        <Stack.Screen name="Notifications" component={NotificationPage} />
        <Stack.Screen
          name="FinancialSystem"
          component={financialSystemScreen}
        />
        <Stack.Screen name="Terms" component={Terms} />

        <Stack.Screen name="Request" component={RequestPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </>
  );
};

export default AppContent;

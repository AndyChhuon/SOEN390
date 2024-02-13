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
import ReservationScreen from "./reservation/reservationScreen";
import financialSystemScreen from "./financialSystem/financialSystemScreen";

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
        <Stack.Screen name="Register" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomTabBarScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
        <Stack.Screen name="Notifications" component={NotificationPage} />
        <Stack.Screen name="Dashboard" component={ownerDashboard} />
        <Stack.Screen
          name="FinancialSystem"
          component={financialSystemScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppContent;

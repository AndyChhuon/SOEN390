import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import LoginScreen from "./auth/loginScreen";
import SignupScreen from "./auth/signupScreen";
import ProfileScreen from "./profile/profileScreen";
import NotificationPage from "./Notifications Page/notificationPage";
import ownerDashboard from "./Dashboard/ownerDashboard";

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
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationPage} />
        <Stack.Screen name="Dashboard" component={ownerDashboard} />
      </Stack.Navigator>
    </>
  );
};

export default AppContent;

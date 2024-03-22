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
<<<<<<< HEAD
import Terms from "./Terms/Terms";
=======
import RequestPage from "./Request/RequestPage";
import ChatPage from "./Request/ChatPage";

>>>>>>> 8519d5937b352215150ff9cf1bdeacaa6c4f74f2

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
        <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
        <Stack.Screen name="Notifications" component={NotificationPage} />
        <Stack.Screen
          name="FinancialSystem"
          component={financialSystemScreen}
        />
<<<<<<< HEAD
        <Stack.Screen name="Terms" component={Terms} />

=======
        <Stack.Screen
          name="Request"
          component={RequestPage}
        />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
        />
>>>>>>> 8519d5937b352215150ff9cf1bdeacaa6c4f74f2
      </Stack.Navigator>
    </>
  );
};

export default AppContent;

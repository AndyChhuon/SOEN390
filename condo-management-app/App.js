import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppContent from "./screens/AppContent";
import { AuthProvider } from "./hooks/useAuth";
import * as Font from "expo-font";
import { View } from "react-native";
const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        SF_Compact_Display_Regular: require("./assets/fonts/SF-Compact-Display-Regular.ttf"),
        SF_Compact_Display_Medium: require("./assets/fonts/SF-Compact-Display-Medium.ttf"),
        SF_Compact_Display_SemiBold: require("./assets/fonts/SF-Compact-Display-Semibold.ttf"),
        SF_Compact_Display_Bold: require("./assets/fonts/SF-Compact-Display-Bold.ttf"),
        SF_Compact_Display_Light: require("./assets/fonts/SF-Compact-Display-Light.ttf"),
        SF_Compact_Display_Thin: require("./assets/fonts/SF-Compact-Display-Thin.ttf"),
        SF_Compact_Display_Black: require("./assets/fonts/SF-Compact-Display-Black.ttf"),
        Sigmar_Regular: require("./assets/fonts/Sigmar-Regular.ttf"),
        Inter_Black: require("./assets/fonts/Inter-Black.ttf"),
        Play_Bold: require("./assets/fonts/Play-Bold.ttf"),
        RethinkSans: require("./assets/fonts/RethinkSans-VariableFont_wght.ttf"),
      });

      setIsInitialized(true);
    }
    loadFont();
  }, []);

  return isInitialized ? (
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  ) : (
    <View></View>
  );
};

export default App;

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import * as Haptics from "expo-haptics";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../constants/types";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const { height, width } = Dimensions.get("window");

  function forgotPassword() {
    return (
      <Text
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        style={{
          textAlign: "center",
          padding: (Sizes.fixPadding * 2.0 * height) / 880,
          marginTop: (Sizes.fixPadding * 2.0 * height) / 880,
        }}
      >
        <Text
          style={{
            textDecorationLine: "underline",
          }}
        >
          Forgot your password?
        </Text>
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text>This is a login screen</Text>
      <StatusBar style="auto" />
      <AwesomeButton
        activeOpacity={0.9}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate("ProfileScreen");
        }}
        backgroundColor={Colors.secondaryGoldColor}
        raiseLevel={5}
        borderRadius={20}
        width={0.8 * width}
        backgroundShadow={Colors.grayColor}
        progress
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </AwesomeButton>
      {forgotPassword()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

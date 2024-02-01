import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import * as Haptics from "expo-haptics";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../constants/types";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function SignupScreen({ navigation }: Props) {
  const { height, width } = Dimensions.get("window");

  function Login() {
    return (
      <Text
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.navigate("Login");
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
          Already signed up?
        </Text>
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>This is a signup screen</Text>
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
          Sign up
        </Text>
      </AwesomeButton>
      {Login()}
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

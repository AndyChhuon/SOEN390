import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../constants/types";
import useAuth from "../../hooks/useAuth";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>This is the profile screen</Text>
      <Text>Profile pic: {user.profilePicUrl}</Text>
      <Text>Username: {user.userName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone #: {user.phoneNumber}</Text>

      <StatusBar style="auto" />
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

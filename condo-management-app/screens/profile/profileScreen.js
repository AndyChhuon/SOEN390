import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import useAuth from "../../hooks/useAuth";

export default function ProfileScreen({ navigation }) {
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

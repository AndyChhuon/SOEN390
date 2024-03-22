import React, { useState } from "react";
import { Colors, Sizes, Fonts } from "../../constants/styles";


import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,

} from "react-native";

const CustomTextInput = ({ placeholder, value, onChangeText, widthMultiplier, style }) => {

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = windowDimensions;
  const styles = createStyles(height);

  return (
    <View>
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          width={widthMultiplier * width}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={Colors.grayColor}
          style={[styles.textInputStyle, style]}
          selectionColor={Colors.primaryColor}
        />
      </View>
      <View style={styles.errorWrapStyle}>
        <Text style={styles.errorTextStyle}></Text>
      </View>
    </View>
  );
};

export default CustomTextInput;

function createStyles(height) {
  return StyleSheet.create({
    textFieldWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginVertical: 10,
      paddingVertical: 10,
      color: "white",
    },

    textInputStyle: {
      ...Fonts.whiteColor16Medium,
      flex: 1,
      marginLeft: Sizes.fixPadding + 2.0,
      paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
      // add other common styles
    },

    propertyItem: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    title: {
      fontWeight: "600",
      color: "white",
      marginRight: 10,
    },
    value: {
      color: "white",
    },

    sizing: {
      fontSize: 18,
      fontWeight: "600",
      color: "white",
      marginRight: 6,
    },

    sizingUnderline: {
      fontSize: 18,
      color: "white",
      marginRight: 6,
      textDecorationLine: "underline",
    },

    content: {
      fontSize: 18,
      color: "white",
    },
  });
}

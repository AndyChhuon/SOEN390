import renderer from 'react-test-renderer';
import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import RegisterScreen from "./signupScreen";

jest.mock("react-native");
jest.mock("../../constants/styles");
jest.mock("@expo/vector-icons");
jest.mock("@react-navigation/native");
jest.mock("react-native-really-awesome-button");
jest.mock("../../hooks/useAuth");

const renderTree = tree => renderer.create(tree);
describe('<RegisterScreen>', () => {
  it('should render component', () => {
    expect(renderTree(<RegisterScreen 
    />).toJSON()).toMatchSnapshot();
  });
  
});
import renderer from 'react-test-renderer';
import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Keyboard,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import useAuth from "../../hooks/useAuth";
import LoginScreen from "./loginScreen";

jest.mock("react-native");
jest.mock("../../constants/styles");
jest.mock("@expo/vector-icons");
jest.mock("react-native-really-awesome-button");
jest.mock("../../hooks/useAuth");

const renderTree = tree => renderer.create(tree);
describe('<LoginScreen>', () => {
  it('should render component', () => {
    expect(renderTree(<LoginScreen 
    />).toJSON()).toMatchSnapshot();
  });
  
});
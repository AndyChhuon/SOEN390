import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { ThemedButton } from "react-native-really-awesome-button";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Button,
  TextInput,
  Alert
} from "react-native";
import { FaHouse } from "react-icons/fa6";

const FinancialSystemScreen = ({ navigation }) => {
  height, width;
  const [wasPopped, setWasPopped] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const { width, height } = windowDimensions;
  const styles = createStyles(height);
  const [state, setState] = useState({
    feePerSquareFoot: "",
    feePerParkingSpot: "",
    operationalBudget: null,
    costDescription: "",
    costAmount: "",
    costEntries: [],
    annualReport: "",
  });

  const [feeInputError, setFeeInputError] = useState("");
  const [costInputError, setCostInputError] = useState("");

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const updateState = (data) => setState((prevState) => ({ ...prevState, ...data }));

  const handleAddCostEntry = () => {
    if (!state.costDescription || !state.costAmount) {
      setCostInputError("Both cost description and amount are required.");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(state.costDescription)) {
      setCostInputError("Cost description should contain only alphabets and spaces.");
      return;
    }

    if (!/^\d+(\.\d+)?$/.test(state.costAmount)) {
      setCostInputError("Cost amount should be a number.");
      return;
    }

    const newId = state.costEntries.length + 1;
    const newCostEntry = { id: newId, description: state.costDescription, amount: state.costAmount };
    setState(prevState => ({ ...prevState, costEntries: [...prevState.costEntries, newCostEntry] }));
    updateState({ costDescription: "", costAmount: "" });
    setCostInputError("");
    Alert.alert('Success', 'Cost entry added successfully.');
  };

  const handleUpdateFees = () => {
    if (!/^\d+(\.\d+)?$/.test(state.feePerSquareFoot) || !/^\d+(\.\d+)?$/.test(state.feePerParkingSpot)) {
      setFeeInputError("Both fee inputs should be numbers.");
      return;
    }

    setFeeInputError("");
    Alert.alert('Success', 'Fees updated successfully.');
  };

  const handleDeleteCostEntry = (id) => {
    const updatedCostEntries = state.costEntries.filter(entry => entry.id !== id);
    setState(prevState => ({ ...prevState, costEntries: updatedCostEntries }));
  };

  const clearErrors = () => {
    setFeeInputError("");
    setCostInputError("");
  };


  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: height }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, justifyContent: "flex-start" }}
        >
          <View>
            <View
              style={{
                ...Cards.card,
                width: width * 0.9,
                alignSelf: "center",
                flexDirection: "column",
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    margin: 2,
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <FaHouse style={{ color: Colors.whiteColor }} />
                  <Text
                    style={{
                      ...Fonts.whiteColor20SemiBold,
                      margin: 10,
                      alignSelf: "center",
                    }}
                  >
                    Financial System
                  </Text>
                </View>
                <View style={{ ...Cards.card, width: width * 0.9, flex: 1, flexDirection: "row", marginBottom: 20 }}>
                  {/* Fee entry section */}
                  <View style={{ flex: 1, paddingRight: 10, borderRightWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <TextInput
                      width={0.9 * width}
                      onChangeText={(value) => updateState({ feePerSquareFoot: value })}
                      placeholder="Enter fee per square foot"
                      value={state.feePerSquareFoot}
                      placeholderTextColor={Colors.grayColor}
                      style={styles.input}
                      selectionColor={Colors.primaryColor}
                      onFocus={clearErrors}
                    />
                    <TextInput
                      width={0.9 * width}
                      onChangeText={(value) => updateState({ feePerParkingSpot: value })}
                      placeholder="Enter fee per parking"
                      value={state.feePerParkingSpot}
                      placeholderTextColor={Colors.grayColor}
                      style={styles.input}
                      selectionColor={Colors.primaryColor}
                      onFocus={clearErrors}
                    />

                    <ThemedButton name="bruce"
                      type="primary"
                      width={width > 600 ? width * 0.2 : width * 0.8}
                      raiseLevel={2}
                      borderRadius={10}
                      style={{
                        marginRight: 20,
                        alignSelf: "center",
                        borderRadius: 5,
                        padding: 10,
                      }}
                      onPress={handleUpdateFees}>
                      <Text
                        style={{
                          ...Fonts.primaryColor16SemiBold,
                          color: Colors.whiteColor,
                        }}
                      >
                        Update Fees
                      </Text>

                    </ThemedButton>
                    {/* <Button title="Update Fees" onPress={handleUpdateFees} /> */}
                    {feeInputError ? <Text style={{ ...styles.errorText, color: 'red' }}>{feeInputError}</Text> : null}
                  </View>

                  {/* Cost entry section */}
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <View style={styles.costEntryCard}>
                      <TextInput
                        width={0.5 * width}
                        onChangeText={(value) => updateState({ costDescription: value })}
                        placeholder="Cost Description"
                        value={state.costDescription}
                        placeholderTextColor={Colors.grayColor}
                        style={styles.input}
                        selectionColor={Colors.primaryColor}
                        onFocus={clearErrors}
                      />
                      <TextInput
                        width={0.3 * width}
                        onChangeText={(value) => updateState({ costAmount: value })}
                        placeholder="Cost Amount"
                        value={state.costAmount}
                        placeholderTextColor={Colors.grayColor}
                        style={styles.input}
                        selectionColor={Colors.primaryColor}
                        onFocus={clearErrors}
                      />
                      <ThemedButton name="bruce"
                        type="primary"
                        width={width > 600 ? width * 0.2 : width * 0.8}
                        raiseLevel={2}
                        borderRadius={10}
                        style={{
                          marginRight: 20,
                          alignSelf: "center",
                          borderRadius: 5,
                          padding: 10,
                        }}
                        onPress={handleAddCostEntry}>
                        <Text
                          style={{
                            ...Fonts.primaryColor16SemiBold,
                            color: Colors.whiteColor,
                          }}
                        >
                          Add Cost Entry
                        </Text>

                      </ThemedButton>
                      {costInputError ? <Text style={{ ...styles.errorText, color: 'red' }}>{costInputError}</Text> : null}
                    </View>

                    {/* Display cost entries */}
                    <View style={styles.costEntriesContainer}>
                      <Text style={styles.costEntriesTitle}>Cost Entries:</Text>
                      {state.costEntries.map((entry) => (
                        <View key={entry.id} style={styles.costEntry}>
                          <Text style={styles.costEntryText}>Description: {entry.description}, Amount: {entry.amount}</Text>
                          <TouchableWithoutFeedback onPress={() => handleDeleteCostEntry(entry.id)}>
                            <Ionicons name="close" size={24} color="black" />
                          </TouchableWithoutFeedback>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                {/* OPERATIONAL BUDGET */}
                <View style={{ ...Cards.card, width: width * 0.9, marginBottom: 20 }}>
                  <Text style={{ ...Fonts.whiteColor20SemiBold, marginBottom: 10 }}>Operational Budget</Text>
                  <Text style={{ ...Fonts.whiteColor16Medium }}>{state.operationalBudget !== null ? `$${state.operationalBudget.toFixed(2)}` : 'N/A'}</Text>
                </View>

                {/* Generate annual report button */}
                <View style={{ marginBottom: 20 }}>
                  {/* <Button title="Generate Annual Report" onPress={() => Alert.alert('Success', 'Annual report generated successfully.')}  /> */}
                  <ThemedButton
                    name="bruce"
                    type="primary"
                    width={width > 600 ? width * 0.2 : width * 0.8}
                    raiseLevel={2}
                    borderRadius={10}
                    style={{
                      marginRight: 20,
                      alignSelf: "center",
                      borderRadius: 5,
                      padding: 10,
                    }}
                    onPress={() =>
                      Alert.alert('Success', 'Annual report generated successfully.')
                    }
                  >

                    <Text
                      style={{
                        ...Fonts.primaryColor16SemiBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      Generate Annual Report
                    </Text>
                  </ThemedButton>

                </View>



                {/* Display annual report */}
                <View>
                  <Text style={{ ...Fonts.whiteColor18Medium }}>{state.annualReport}</Text>
                </View>

              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );

  if (Platform.OS === "web") {
    return content;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
        {content}
      </SafeAreaView>
    );
  }
};

export default FinancialSystemScreen;

function createStyles(height) {
  return StyleSheet.create({
    input: {
      ...Fonts.whiteColor14Medium,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding * 1.5,
      paddingHorizontal: Sizes.fixPadding * 2.5,
      paddingVertical: Sizes.fixPadding * 1.2,
      marginHorizontal: Sizes.fixPadding * 2.5,
      marginBottom: Sizes.fixPadding * 2.5,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.03)",
    },
    costEntryCard: {
      backgroundColor: "rgba(255,255,255,0.03)",
      borderRadius: Sizes.fixPadding * 1.5,
      paddingHorizontal: Sizes.fixPadding * 2.5,
      paddingVertical: Sizes.fixPadding * 1.2,
      marginBottom: Sizes.fixPadding * 2.5,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.03)",
    },
    costEntriesContainer: {
      marginTop: 10,
      flex: 1,
    },
    costEntriesTitle: {
      ...Fonts.whiteColor16SemiBold,
      marginBottom: 5,
    },
    costEntry: {
      backgroundColor: Colors.bodyBackColor2,
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    costEntryText: {
      ...Fonts.whiteColor14Medium,
    },
    errorText: {
      color: 'red',
    },



  });
}




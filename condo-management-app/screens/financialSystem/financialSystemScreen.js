import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
import { ThemedButton } from "react-native-really-awesome-button";
import React, { useRef, useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
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
  ScrollView,
} from "react-native";
import { FaHouse } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";

const FinancialSystemScreen = ({ route, navigation }) => {
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
    operationalBudget: null,
    costEntries: [],
    annualReport: "",
  });

  const [tempState, setTempState] = useState({
    costDescription: "",
    costAmount: "",
    tenantID: "",
  });
  const { userValues, updatePropertyFinancials, generatePdf } = useAuth();
  console.log(state);
  const propertyId = route?.params?.propertyId;
  console.log(userValues?.propertiesOwned[propertyId].financials);
  const propertyDetails = userValues.propertiesOwned[propertyId];
  const [feeInputError, setFeeInputError] = useState("");
  const [costInputError, setCostInputError] = useState("");

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    if (userValues?.propertiesOwned[propertyId].financials) {
      updateState(userValues?.propertiesOwned[propertyId].financials);
    }

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const updateTempState = (data) =>
    setTempState((prevState) => ({ ...prevState, ...data }));

  const handleAddCostEntry = () => {
    if (!tempState.costDescription || !tempState.costAmount) {
      setCostInputError("Both cost description and amount are required.");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(tempState.costDescription)) {
      setCostInputError(
        "Cost description should contain only alphabets and spaces."
      );
      return;
    }

    if (!/^\d+(\.\d+)?$/.test(tempState.costAmount)) {
      setCostInputError("Cost amount should be a number.");
      return;
    }

    const newId = state.costEntries.length + 1;
    const newCostEntry = {
      id: tempState.TenantID,
      description: tempState.costDescription,
      amount: tempState.costAmount,
    };
    setState((prevState) => {
      updatePropertyFinancials(propertyId, {
        ...prevState,
        costEntries: [...prevState.costEntries, newCostEntry],
      });

      return {
        ...prevState,
        costEntries: [...prevState.costEntries, newCostEntry],
      };
    });
    setCostInputError("");
    setTempState({ costDescription: "", costAmount: "", TenantID: "" });
  };

  const handleUpdateFees = () => {
    if (
      !/^\d+(\.\d+)?$/.test(state.feePerSquareFoot) ||
      !/^\d+(\.\d+)?$/.test(state.feePerParkingSpot)
    ) {
      setFeeInputError("Both fee inputs should be numbers.");
      return;
    }

    setFeeInputError("");
    updatePropertyFinancials(propertyId, state);
  };

  const handleDeleteCostEntry = (id) => {
    const updatedCostEntries = state.costEntries.filter(
      (entry) => entry.id !== id
    );
    setState((prevState) => ({
      ...prevState,
      costEntries: updatedCostEntries,
    }));
  };

  const clearErrors = () => {
    setFeeInputError("");
    setCostInputError("");
  };
  function backArrow() {
    return (
      <View style={[{ margin: 10 }, { ...styles.backArrowWrapStyle }]}>
        <MaterialIcons
          name="chevron-left"
          color={Colors.whiteColor}
          size={26}
          onPress={() => {
            if (wasPopped) return;
            setWasPopped(true);
            navigation.pop();
          }}
        />
      </View>
    );
  }

  const content = (
    <SafeAreaView style={{ backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, height: height }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {backArrow()}
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <View style={{ marginTop: 25 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FaHouse
                    size={30}
                    style={{
                      color: Colors.whiteColor,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <Text
                    style={{
                      ...Fonts.whiteColor30SemiBold,
                      alignSelf: "center",
                    }}
                  >
                    {propertyDetails.propertyName || "Property Name"}
                  </Text>
                </View>
                <View
                  style={{
                    width: width * 0.9,
                    flexDirection: "column",
                    padding: 10,
                  }}
                >
                  {/* Fee entry section */}
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor14Medium,
                        }}
                      >
                        Fee per Square Foot
                      </Text>
                    </View>
                    {FeePerSquareFoot()}
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor14Medium,
                        }}
                      >
                        Parking Fee
                      </Text>
                    </View>

                    {FeePerParkingSpot()}
                    <ThemedButton
                      name="bruce"
                      type="primary"
                      raiseLevel={2}
                      style={{
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                      onPress={handleUpdateFees}
                    >
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
                    {feeInputError ? (
                      <Text style={{ ...styles.errorText, color: "red" }}>
                        {feeInputError}
                      </Text>
                    ) : null}
                  </View>

                  {/* Cost entry section */}

                  <View>
                    <Text
                      style={{
                        ...Fonts.whiteColor20SemiBold,
                        marginVertical: 20,
                      }}
                    >
                      Charge Tenant
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor14Medium,

                          alignSelf: "center",
                        }}
                      >
                        Tenant ID
                      </Text>
                    </View>
                    {TenantID()}
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor14Medium,
                        }}
                      >
                        Cost Description
                      </Text>
                    </View>
                    {CostDescription()}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor14Medium,

                          alignSelf: "center",
                        }}
                      >
                        Cost Amount
                      </Text>
                    </View>
                    {CostAmount()}
                    <ThemedButton
                      name="bruce"
                      type="primary"
                      raiseLevel={2}
                      style={{
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                      onPress={handleAddCostEntry}
                    >
                      <Text
                        style={{
                          ...Fonts.primaryColor16SemiBold,
                          color: Colors.whiteColor,
                        }}
                      >
                        Add Cost Entry
                      </Text>
                    </ThemedButton>
                    {costInputError ? (
                      <Text style={{ ...styles.errorText, color: "red" }}>
                        {costInputError}
                      </Text>
                    ) : null}
                  </View>

                  {/* Display cost entries */}
                  <View style={styles.costEntriesContainer}>
                    <Text style={styles.costEntriesTitle}>Cost Entries:</Text>
                    <ScrollView style={{}}>
                      {state.costEntries.map((entry) => (
                        <View key={entry.id}>
                          <View
                            style={{
                              backgroundColor: Colors.bodyBackColor,
                              alignContent: "center",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              borderRadius: 5,
                              padding: 10,
                              margin: 5,
                              shadowColor: "black",
                              shadowRadius: 10,
                              shadowOpacity: 0.2,
                              shadowOffset: { width: 2, height: 2 },
                            }}
                          >
                            <View>
                              <Text style={styles.costEntryText}>
                                Tenant: {entry.id}
                              </Text>
                              <Text style={styles.costEntryText}>
                                Description: {entry.description}, Amount:{" "}
                                {entry.amount}
                              </Text>
                            </View>
                            <TouchableWithoutFeedback
                              onPress={() => handleDeleteCostEntry(entry.id)}
                              style={{ marginLeft: 15 }}
                            >
                              <Ionicons name="close" size={24} color="white" />
                            </TouchableWithoutFeedback>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>

                {/* OPERATIONAL BUDGET */}
                <View style={{ marginHorizontal: 15 }}>
                  <View>
                    <Text
                      style={{
                        ...Fonts.whiteColor20SemiBold,
                        marginBottom: 10,
                      }}
                    >
                      Operational Budget
                    </Text>
                    <Text style={{ ...Fonts.whiteColor16Medium }}>
                      {state.operationalBudget !== null
                        ? `$${state.operationalBudget.toFixed(2)}`
                        : "N/A"}
                    </Text>
                  </View>

                  {/* Generate annual report button */}
                  <View style={{ marginBottom: "15%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 15,
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.whiteColor20SemiBold,
                          alignSelf: "center",
                        }}
                      >
                        Generate Annual Report
                      </Text>
                    </View>
                    {/* <Button title="Generate Annual Report" onPress={() => Alert.alert('Success', 'Annual report generated successfully.')}  /> */}
                    <ThemedButton
                      name="bruce"
                      type="primary"
                      raiseLevel={2}
                      style={{
                        marginTop: 10,
                      }}
                      onPress={() => {
                        generatePdf(propertyId);
                      }}
                    >
                      <Text
                        style={{
                          ...Fonts.primaryColor16SemiBold,
                          color: Colors.whiteColor,
                        }}
                      >
                        Generate Report
                      </Text>
                    </ThemedButton>
                  </View>
                </View>

                {/* Display annual report */}
                <View>
                  <Text style={{ ...Fonts.whiteColor18Medium }}>
                    {state.annualReport}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );

  function FeePerSquareFoot() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          ></TouchableOpacity>
          <TextInput
            id="fees_per_square_foot"
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ feePerSquareFoot: value })}
            placeholder="Fee per square foot"
            value={state.feePerSquareFoot}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function CostAmount() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          ></TouchableOpacity>
          <TextInput
            id="cost_ammount_id"
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateTempState({ costAmount: value })}
            placeholder="Enter cost amount"
            value={tempState.costAmount}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }
  function CostDescription() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          ></TouchableOpacity>
          <TextInput
            id="cost_desc_id"
            ref={input}
            width={0.9 * width}
            onChangeText={(value) =>
              updateTempState({ costDescription: value })
            }
            placeholder="Enter the cost description"
            value={tempState.costDescription}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function TenantID() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          ></TouchableOpacity>
          <TextInput
            id="tenant_id"
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateTempState({ TenantID: value })}
            placeholder="Enter the tenants ID"
            value={tempState.TenantID}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

  function FeePerParkingSpot() {
    const input = useRef();
    return (
      <View>
        <View style={styles.textFieldWrapStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => input.current.focus()}
          ></TouchableOpacity>
          <TextInput
            id="fee_per_parking_spot"
            ref={input}
            width={0.9 * width}
            onChangeText={(value) => updateState({ feePerParkingSpot: value })}
            placeholder="Enter fee per parking"
            value={state.feePerParkingSpot}
            placeholderTextColor={Colors.grayColor}
            style={{
              ...Fonts.whiteColor14Medium,
              flex: 1,
              marginLeft: Sizes.fixPadding + 2.0,
              paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
            }}
            selectionColor={Colors.primaryColor}
          />
        </View>
      </View>
    );
  }

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
      ...Fonts.whiteColor16Medium,
      flex: 1,
      marginLeft: Sizes.fixPadding + 2.0,
      paddingVertical: ((Sizes.fixPadding + 7.0) * height) / 880,
    },

    textFieldWrapStyle: {
      flexDirection: "row",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: Sizes.fixPadding - 5.0,
      paddingHorizontal: Sizes.fixPadding + 2.0,
      paddingVertical: (Sizes.fixPadding + 2.0) / 2.0,
    },
    costEntryCard: {
      backgroundColor: "rgba(255,255,255,0.03)",
      borderRadius: Sizes.fixPadding * 1.5,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.03)",
    },
    costEntriesContainer: {
      marginTop: 10,
    },
    costEntriesTitle: {
      ...Fonts.whiteColor16SemiBold,
      marginBottom: 5,
    },
    costEntry: {
      backgroundColor: Colors.cardmaincolor,
      padding: 5,
      borderRadius: 5,
      marginBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    costEntryText: {
      ...Fonts.whiteColor14Medium,
    },
    errorText: {
      color: "red",
    },
  });
}

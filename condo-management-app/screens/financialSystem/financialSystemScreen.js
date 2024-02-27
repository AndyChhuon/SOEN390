import React, { useState, useEffect } from "react";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
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
TextInput, 
Button, 
Alert } from "react-native";
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
  
  // updating window dimensions
  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  // Update state function
  const updateState = (data) => setState((prevState) => ({ ...prevState, ...data }));

  // Add cost entry function
  const handleAddCostEntry = () => {
    const newId = state.costEntries.length + 1;
    const newCostEntry = { id: newId, description: state.costDescription, amount: state.costAmount };
    setState(prevState => ({ ...prevState, costEntries: [...prevState.costEntries, newCostEntry] }));
    updateState({ costDescription: "", costAmount: "" });
  };
  
  // Delete cost entry function
  const handleDeleteCostEntry = (id) => {
    const updatedCostEntries = state.costEntries.filter(entry => entry.id !== id);
    setState(prevState => ({ ...prevState, costEntries: updatedCostEntries }));
  };

 
 // MAIN CONTENTS DISPLAYED
  const content = (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor2 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <ScrollView horizontal={true}>
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 10 }}>
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
                  />
                  <TextInput
                    width={0.9 * width}
                    onChangeText={(value) => updateState({ feePerParkingSpot: value })}
                    placeholder="Enter fee per parking"
                    value={state.feePerParkingSpot}
                    placeholderTextColor={Colors.grayColor}
                    style={styles.input}
                    selectionColor={Colors.primaryColor}
                  />
                  <Button title="Update Fees" onPress={() => Alert.alert('Success', 'Fees updated successfully.')} color="#00796b" />
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
                    />
                    <TextInput
                      width={0.3 * width}
                      onChangeText={(value) => updateState({ costAmount: value })}
                      placeholder="Cost Amount"
                      value={state.costAmount}
                      placeholderTextColor={Colors.grayColor}
                      style={styles.input}
                      selectionColor={Colors.primaryColor}
                    />
                    <Button title="Add Cost Entry" onPress={handleAddCostEntry} style={{ alignSelf: 'flex-start', marginTop: 10 }} color="#00796b" />
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
                <Button title="Generate Annual Report" onPress={() => Alert.alert('Success', 'Annual report generated successfully.')} color="#00796b" />
              </View>

              {/* Display annual report */}
              <View>
                <Text style={{ ...Fonts.whiteColor14Medium }}>{state.annualReport}</Text>
              </View>
            </View>
            
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );

  // Render content based on platform
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

// Styles
const createStyles = (height) => {
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
      backgroundColor: Colors.bodyBackColor2,
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
      backgroundColor: Colors.grayColor,
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    costEntryText: {
      ...Fonts.whiteColor14Medium,
    }
  });
};

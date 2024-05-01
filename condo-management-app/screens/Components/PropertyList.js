import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

const PropertyList = ({ properties, navigation }) => {
    return properties.map((propertyId, details) => (
        <View key={propertyId} style={
            {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                margin: 5,
                backgroundColor: "#f9f9f9",
                borderRadius: 10
            }
        }>
            <View style={{ justifyContent: "center", flexWrap: "wrap" }}>
                <Image
                    source={{ uri: details.files?.condoimage || "https://placehold.co/400x400" }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                />
            </View>
            {/* Display other property details */}
            <ThemedButton
                onPress={() => navigation.navigate("PropertyScreen", { propertyId, propertyDetails: details })}
            >
                <Text>View Listing</Text>
            </ThemedButton>
        </View>
    ));
};

export default PropertyList;
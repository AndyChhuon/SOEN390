import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Cards } from "../../constants/styles";
import AwesomeButton from "react-native-really-awesome-button";
import { MdOutlinePayments } from "react-icons/md";


const PropertyCard = ({ width, name, rentPaid, amount }) => {
  return (
    <View style={{ ...Cards.card, width: width*0.9}}>
      <MdOutlinePayments  size={100} style={{color: Colors.whiteColor, height: 100, flexDirection: "column"}}/>

      <View style={{ flexDirection: "column", padding: 30 }}>
        <Text style={{ ...Fonts.grayColor12Medium, color: Colors.whiteColor, fontSize:24, marginBottom:5 }}>
          Name: {name}
        </Text>
        <Text style={{ ...Fonts.primaryColor16Regular, color: Colors.whiteColor, fontSize:15 }}>
          Amount: {amount}
        </Text>
        <Text style={{ ...Fonts.primaryColor16Regular, color: Colors.whiteColor, fontSize:15  }}>
          Rent Paid: {rentPaid}
        </Text>

      </View>
    </View>
  );

  function ViewTickets() {
    return (
      <View style={{ flex: 1, alignItems: "center"}}> 
        <AwesomeButton
          activeOpacity={0.9}
          width={null} 
          
          stretch={true} 
          backgroundColor={Colors.secondaryGoldColor}
          raiseLevel={1}
          borderRadius={10}
          backgroundShadow={Colors.grayColor}
        >
          <Text
            style={{
              ...Fonts.whiteColor18Medium,
              textAlign: "center",
            }}
          >
            View 
          </Text>
        </AwesomeButton>
      </View>
    );
  }
};

export default PropertyCard;

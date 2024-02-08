import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Cards } from "../../constants/styles";
import AwesomeButton from "react-native-really-awesome-button";


const PropertyCard = ({ width, imageURL, addressText, rentPaid, ticketsOpen, Occupied, showBtn }) => {
  return (
    <View style={{ ...Cards.card, width: width*0.9}}>
      <Image
        source={{ uri: imageURL|| "https://s3.amazonaws.com/usmsswimages/5336/40759/3.jpg" }}
        style={{ width: 200, height: 200}}
      />

      <View style={{ flexDirection: "column", padding: 30 }}>
        <Text style={{ ...Fonts.grayColor12Medium, color: Colors.whiteColor, fontSize:24, marginBottom:5 }}>
          Address: {addressText}
        </Text>
        <Text style={{ ...Fonts.primaryColor16Regular, color: Colors.whiteColor, fontSize:15 }}>
          Occupied: {Occupied}
        </Text>
        <Text style={{ ...Fonts.primaryColor16Regular, color: Colors.whiteColor, fontSize:15  }}>
          Rent Paid: {rentPaid}
        </Text>
        <Text style={{ ...Fonts.primaryColor16Regular, color: Colors.whiteColor, fontSize:15, marginBottom:10  }}>
          Tickets Open: {ticketsOpen}
        </Text>
        {ViewTickets()}

      </View>
    </View>
  );

  function ViewTickets() {
    return (
      <View style={{ flex: 1, width: '80%', height: '70%' }}> 
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
            View Tickets
          </Text>
        </AwesomeButton>
      </View>
    );
  }
};

export default PropertyCard;

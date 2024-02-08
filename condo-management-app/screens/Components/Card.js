import React from 'react';
import { View } from 'react-native';
import { Cards } from "../../constants/styles";

const Card = ({ width, children }) => {
  return (
    <View style={{ ...Cards.card, width: width * 0.3 }}>
      {children}
    </View>
  );
};

export default Card;

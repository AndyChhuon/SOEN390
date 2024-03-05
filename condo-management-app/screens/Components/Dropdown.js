import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";


const Dropdown = ({ data, onSelect, dropdownText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.buttonText, {...Fonts.whiteColor14Medium,}]}>
          {selectedItem ? selectedItem.label : dropdownText}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => handleSelect(item)}
            >
              <Text style={[styles.itemText, {...Fonts.whiteColor14Medium,}]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  button: {
    padding: 15,
    color: Colors.whiteColor,
    width: "100%",
    borderRadius: 10,
    zIndex: 1,

  },
  buttonText: {
    textAlign: "center",
    borderRadius: 5,
    color: Colors.whiteColor,
  },
  dropdown: {
    position: "relative",
    width: "100%",
    zIndex: 2,

  },
  item: {
    padding: 10,
    marginVertical: 3,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderRadius: 5,
  },
  itemText: {
    textAlign: "center",
    color: Colors.whiteColor,


  },
});

export default Dropdown;

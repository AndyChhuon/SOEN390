import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes, Cards } from "../../constants/styles";

const Dropdown = ({ data, onSelect, dropdownText, value = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

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
        <Text style={[styles.buttonText, { ...Fonts.whiteColor16Bold }]}>
          {selectedItem ? selectedItem.label : dropdownText}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {data.map((item, index) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[styles.itemText, { ...Fonts.whiteColor14Regular }]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            </ScrollView>
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
    marginVertical: 5,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderRadius: 3,
  },
  itemText: {
    textAlign: "center",
    color: Colors.whiteColor,
  },
});

export default Dropdown;

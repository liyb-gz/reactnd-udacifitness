import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { purple } from "../utils/color";

const TextButton = ({ children, onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.reset, style]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reset: {
    textAlign: "center",
    color: purple,
  },
});

export default TextButton;

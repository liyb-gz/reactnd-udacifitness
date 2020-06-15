import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { white, purple } from "../utils/color";

const SubmitButton = ({ handleSubmit }) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSummitBtn
      }
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  textWhite: {
    color: "white",
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSummitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingHorizontal: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

export default SubmitButton;

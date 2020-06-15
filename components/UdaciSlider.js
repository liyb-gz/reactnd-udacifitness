import React from "react";
import { Text, View, Slider, StyleSheet } from "react-native";
import { gray } from "../utils/color";

function UdaciSlider({ max, unit, step, value, onSlide }) {
  return (
    <View style={styles.row}>
      <Slider
        style={{ flex: 1 }}
        maximumValue={max}
        value={value}
        step={step}
        onValueChange={onSlide}
      />
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  metricCounter: {
    width: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  paddingV: {
    paddingVertical: 10,
  },
  paddings: {
    padding: 10,
  },
});

export default UdaciSlider;

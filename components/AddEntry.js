import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, Platform } from "react-native";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from "../utils/helpers";
import UdaciSteppers from "./UdaciSteppers";
import UdaciSlider from "./UdaciSlider";
import DateHeader from "./DateHeader";
import SubmitButton from "./SubmitButton";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions/index";
import { white, blue, purple } from "../utils/color";

export class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] + step;
      return {
        [metric]: count > max ? max : count,
      };
    });
  };
  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    this.setState((state) => {
      const count = state[metric] - step;
      return {
        [metric]: count < 0 ? 0 : count,
      };
    });
  };
  slide = (metric, value) => {
    this.setState({
      [metric]: value,
    });
  };
  handleSubmit = () => {
    const key = timeToString();
    const entry = this.state;

    this.props.dispatch(
      addEntry({
        [key]: [entry],
      })
    );

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    submitEntry({ entry, key });
  };
  reset = () => {
    const key = timeToString();

    this.props.dispatch(
      addEntry({
        [key]: [getDailyReminderValue()],
      })
    );

    removeEntry(key);
  };
  render() {
    const metaInfo = getMetricMetaInfo();
    console.log("this.props: ", this.props);
    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
            color="black"
            size={100}
          />
          <Text>You already logged today's data!</Text>
          <TextButton onPress={this.reset} style={{ padding: 20 }}>
            Reset
          </TextButton>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <DateHeader style={styles.box} date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View style={[styles.box, styles.row]} key={key}>
              {getIcon()}
              {type === "steppers" ? (
                <UdaciSteppers
                  {...rest}
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              ) : (
                <UdaciSlider
                  {...rest}
                  value={value}
                  onSlide={(value) => this.slide(key, value)}
                />
              )}
            </View>
          );
        })}
        <SubmitButton style={styles.box} handleSubmit={this.handleSubmit} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  box: {
    flex: 1,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
});

function mapStateToProps(state) {
  const key = timeToString();
  console.log("state[key]", state[key]);
  console.log("state[key].length", state[key].length);
  console.log("state[key][0]", state[key][0]);

  return {
    alreadyLogged:
      state[key].length > 0 && typeof state[key][0].today === "undefined",
  };
}

export default connect(mapStateToProps)(AddEntry);

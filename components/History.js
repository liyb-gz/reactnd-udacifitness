import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResult } from "../utils/api";

export class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetchCalendarResult()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            })
          );
        }
      });
  }

  render() {
    console.log("render, ", this.props);
    return (
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps)(History);

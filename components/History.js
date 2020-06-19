import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResult } from "../utils/api";
import { Agenda } from "react-native-calendars";
import { white } from "../utils/color";
import MetricCard from "./MetricCard";
import { AppLoading } from "expo";

export class History extends Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalendarResult()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()] || entries[timeToString()].length === 0) {
          dispatch(
            addEntry({
              [timeToString()]: [getDailyReminderValue()],
            })
          );
        }
      })
      .then(() => {
        this.setState({
          ready: true,
        });
      });
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <Text>{today}</Text>
      ) : (
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <MetricCard metrics={metrics} />
        </TouchableOpacity>
      )}
    </View>
  );

  renderEmptyDate = (formattedDate) => {
    return (
      <View style={styles.item}>
        <Text style={styles.noDataText}>No Data for this day</Text>
      </View>
    );
  };

  render() {
    const { entries } = this.props;
    const { ready } = this.state;
    if (!ready) {
      return <AppLoading />;
    }

    return (
      <Agenda
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
    //   <View>
    //     <Text>{JSON.stringify(entries)}</Text>
    //   </View>
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    // fontSize: 20,
    // paddingVertical: 20,
  },
});

function mapStateToProps(entries) {
  return {
    entries,
  };
}

export default connect(mapStateToProps)(History);
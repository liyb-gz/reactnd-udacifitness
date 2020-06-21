import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/color";
import MetricCard from "./MetricCard";
import dayjs from "dayjs";
import { removeEntry } from "../utils/api";
import { addEntry } from "../actions";

export class EntryDetail extends Component {
  componentDidMount() {
    const { entryId } = this.props.route.params;
    const { setOptions } = this.props.navigation;
    const day = dayjs(entryId).format("D MMM, YYYY");
    setOptions({
      title: day,
    });
  }

  render() {
    const { entryId, metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>Entry Detail - {entryId}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(state, props) {
  const { entryId } = props.route.params;
  return {
    entryId,
    metrics: state[entryId][0],
  };
}
export default connect(mapStateToProps)(EntryDetail);

import React, { Component } from "react";
import {
  View,
  Slider,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { blue, purple, white } from "./utils/color";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";

const store = createStore(reducer, middleware);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    switch (route.name) {
      case "History":
        return <Ionicons name="ios-bookmarks" size={size} color={color} />;
      case "AddEntry":
        return <FontAwesome name="plus-square" size={size} color={color} />;
      default:
        return <FontAwesome name="question" size={size} color={color} />;
    }
  },
});

const stackOptions = ({ route }) => {
  return {
    title: route.name,
    headerStyle: {
      backgroundColor: purple,
    },
    headerTintColor: white,
  };
};

const UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const TabNavs = () => (
  <Tab.Navigator screenOptions={tabOptions}>
    <Tab.Screen name="History" component={History} />
    <Tab.Screen name="AddEntry" component={AddEntry} />
  </Tab.Navigator>
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <UdaciStatusBar
            barStyle="light-content"
            translucent
            backgroundColor={blue}
          />
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavs}
              options={stackOptions}
            />
            <Stack.Screen
              name="EntryDetail"
              component={EntryDetail}
              options={stackOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

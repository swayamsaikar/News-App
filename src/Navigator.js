import React, { Component } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import generalNewsScreen from "./screens/generalNewsScreen";
import techNewsScreen from "./screens/techNewsScreen";
import BusinessNews from "./screens/BusinessNews";

const tab = createMaterialTopTabNavigator();
const stack = createStackNavigator();

export default class MainStackScreen extends Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#37897e",
              shadowColor: 0,
              elevation: 0,
              borderBottomColor: "#37897e",
            },

            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            },
          }}
        >
          <stack.Screen name="News App" component={TabScreen} />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}

class TabScreen extends Component {
  render() {
    return (
      <tab.Navigator
        initialRouteName="General"
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#e8dfdf",

          labelStyle: {
            textTransform: "capitalize",
            fontWeight: "bold",
          },
          indicatorStyle: {
            backgroundColor: "#fff",
            height: 3,
          },
          style: {
            backgroundColor: "#37897E",
          },
        }}
      >
        <tab.Screen name="General" component={generalNewsScreen} />
        <tab.Screen name="Technology" component={techNewsScreen} />
        <tab.Screen name="Business" component={BusinessNews} />
      </tab.Navigator>
    );
  }
}

//http://localhost:19006/

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MatchScreen from "./src/screens/MatchScreen";
import PointsTableScreen from "./src/screens/PointsTableScreen";
import PlayerStatsScreen from "./src/screens/PlayerStatsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="PointsTable" component={PointsTableScreen} />
        <Stack.Screen name="PlayerStats" component={PlayerStatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

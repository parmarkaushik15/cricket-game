import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// ❌ Old
// import { createStackNavigator } from '@react-navigation/stack';

// ✅ New
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import MatchScreen from './src/screens/MatchScreen';
import TournamentScreen from './src/screens/TournamentScreen'; // Optional if using tournaments

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0A3D62' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Cricket World Championship' }}
        />

        {/* Match Screen */}
        <Stack.Screen
          name="MatchScreen"
          component={MatchScreen}
          options={{ title: 'Play Match' }}
        />

        {/* Tournament Screen (Optional) */}
        <Stack.Screen
          name="TournamentScreen"
          component={TournamentScreen}
          options={{ title: 'Tournaments' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '../enums/Screen';
import LoadingScreen from '../screens/Loading';
import PlayerScreen from '../screens/Player';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none" initialRouteName={Screen.Loading}>
      <Stack.Screen name={Screen.Loading} component={LoadingScreen} />
      <Stack.Screen name={Screen.Login} component={LoginScreen} />
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.Player} component={PlayerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import PlaylistScreen from '../screens/Playlist';
import LoadingScreen from '../screens/Loading';
import { Screen } from '../enums/Screen';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none" initialRouteName={Screen.Loading}>
      <Stack.Screen name={Screen.Loading} component={LoadingScreen} />
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.Playlist} component={PlaylistScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '../enums/Screen';
import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import { Provider as PaperProvider } from 'react-native-paper';
import Snackbar from './Snackbar';
import useUpdateRelease from '../hooks/useUpdateRelease';
import SettingsScreen from '../screens/Settings';

const Stack = createStackNavigator();

const App = () => {
  useUpdateRelease();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Screen.Loading}>
          <Stack.Screen
            name={Screen.Loading}
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Screen.Login}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Screen.Home}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Screen.Settings}
            component={SettingsScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Snackbar />
    </PaperProvider>
  );
};

export default App;

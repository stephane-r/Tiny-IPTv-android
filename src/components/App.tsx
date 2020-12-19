import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
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
import PlayerScreen from '../screens/Player';
import { SENTRY_API_KEY } from '@env';

Sentry.init({
  dsn: SENTRY_API_KEY,
});

const Stack = createStackNavigator();

const App = () => {
  useUpdateRelease();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={Screen.Loading}>
          <Stack.Screen name={Screen.Loading} component={LoadingScreen} />
          <Stack.Screen name={Screen.Login} component={LoginScreen} />
          <Stack.Screen name={Screen.Home} component={HomeScreen} />
          <Stack.Screen name={Screen.Player} component={PlayerScreen} />
          <Stack.Screen name={Screen.Settings} component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Snackbar />
    </PaperProvider>
  );
};

export default App;

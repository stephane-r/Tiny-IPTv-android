import React from 'react';
import TabScreen from './Tab';
import FavorisScreen from './Favoris';
import { Screen } from '../enums/Screen';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from '../components/Navigation';

const Stack = createStackNavigator();

const HomeTv: React.FC = ({ categoriesFiltered, data }) => (
  <>
    <Navigation items={categoriesFiltered} />
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
      }}
      initialRouteName={Screen.Loading}>
      <Stack.Screen name={Screen.Favoris} component={FavorisScreen} />
      {categoriesFiltered.map((c) => (
        <Stack.Screen
          key={c}
          name={c}
          component={TabScreen}
          initialParams={{
            categoryName: c,
            data: data[c],
          }}
        />
      ))}
    </Stack.Navigator>
  </>
);

export default HomeTv;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabScreen from './Tab';
import { useApp } from '../states/app';
import Navigation from '../components/Navigation';
import FavorisScreen from './Favoris';
import { Screen } from '../enums/Screen';
import TabBar, { TAB_ICONS } from '../components/TabBar';

const Tab = createMaterialTopTabNavigator();

const HomeScreen: React.FC = () => {
  const app = useApp();

  return (
    <View style={styles.body}>
      <Navigation />
      {app?.categories ? (
        <Tab.Navigator
          lazy
          tabBar={(props) => <TabBar {...props} />}
          tabBarPosition="bottom">
          {app.categories.map((c, index) => (
            <Tab.Screen
              key={c}
              name={c}
              component={TabScreen}
              initialParams={{
                categoryName: c,
                data: app.data[c],
              }}
            />
          ))}
          <Tab.Screen name={Screen.Favoris} component={FavorisScreen} />
        </Tab.Navigator>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

// const TAB_BAR_OPTIONS = {
//   scrollEnabled: true,
//   tabStyle: {
//     width: 100,
//   },
//   activeTintColor: 'white',
//   inactiveTintColor: 'white',
//   showIcon: true,
//   style: { height: 100, alignItems: 'center', backgroundColor: '#1d1d1d' },
// };

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1d1d1d',
  },
});

export default HomeScreen;

import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native-paper';
import TabScreen from './Tab';
import FavorisScreen from './Favoris';
import { Screen } from '../enums/Screen';
import getQualityIcon from '../utils/getQualityIcon';

const Tab = createMaterialTopTabNavigator();

const TAB_NAVIGATOR_PROPS = () => {
  const props = {
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      showIcon: true,
      showLabel: false,
    },
    sceneContainerStyle: {
      backgroundColor: 'transparent',
    },
    lazyPlaceholder: () => (
      <View style={styles.activityIndicator}>
        <ActivityIndicator color="white" size="large" />
      </View>
    ),
    removeClippedSubviews: true,
    tabBarPosition: 'bottom',
  };

  if (Platform.isTV) {
    props.tabBarOptions = {
      ...props.tabBarOptions,
      tabStyle: {
        width: 60,
      },
      activeTintColor: 'rgba(255, 255, 255, 1)',
      inactiveTintColor: 'rgba(255, 255, 255, .2)',
      indicatorStyle: {
        backgroundColor: 'white',
      },
      style: {
        backgroundColor: '#b7a742',
      },
    };
    props.tabBarPosition = 'top';
  } else {
    props.tabBarOptions = {
      ...props.tabBarOptions,
      tabStyle: {
        width: 80,
      },
      indicatorStyle: {
        backgroundColor: 'black',
      },
      activeTintColor: 'rgba(0, 0, 0, 1)',
      inactiveTintColor: 'rgba(0, 0, 0, .1)',
    };
  }

  return props;
};

const HomeScreen: React.FC = ({ categoriesFiltered, data }) => (
  <Tab.Navigator {...TAB_NAVIGATOR_PROPS()}>
    <Tab.Screen
      name={Screen.Favoris}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="favorite" size={26} color={color} />
        ),
      }}
      component={FavorisScreen}
    />
    {categoriesFiltered.map((c) => (
      <Tab.Screen
        key={c}
        name={c}
        component={TabScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon {...getQualityIcon(c)} color={color} />
          ),
        }}
        initialParams={{
          categoryName: c,
          data: data[c],
        }}
      />
    ))}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1 },
});

export default HomeScreen;

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { isTablet } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import TabScreen from './Tab';
import { useApp, AppState, setFavoris } from '../states/app';
import FavorisScreen from './Favoris';
import { Screen } from '../enums/Screen';
import TabBar from '../components/TabBar';
import AsyncStorage from '@react-native-community/async-storage';
import { Playlist } from '../enums/Playlist';
import Player from '../components/Player';

const Tab = createMaterialTopTabNavigator();

const TAB_NAVIGATOR_PROPS = () => {
  const props = {
    lazy: true,
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

  if (isTablet()) {
    props.tabBar = (tabBarProps) => <TabBar {...tabBarProps} />;
  } else {
    props.tabBarOptions = {
      scrollEnabled: true,
      tabStyle: {
        width: 80,
      },
      showIcon: true,
      showLabel: false,
    };
  }

  return props;
};

const GRADIENT_COLORS = ['#1d1d1d', '#5a5a5a'];

const HomeScreen: React.FC = () => {
  const app: AppState = useApp();

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(Playlist.Favoris),
      AsyncStorage.getItem(Playlist.FavorisIds),
    ]).then(([favoris, favorisIds]) => {
      setFavoris({
        ids: JSON.parse(favorisIds) ?? [],
        data: JSON.parse(favoris) ?? [],
      });
    });
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
      colors={GRADIENT_COLORS}>
      {app?.categories ? (
        <Tab.Navigator {...TAB_NAVIGATOR_PROPS()}>
          <Tab.Screen
            name={Screen.Favoris}
            options={{
              tabBarIcon: () => <Icon name="favorite" size={25} color="#000" />,
            }}
            component={FavorisScreen}
          />
          {app.categoriesFiltered.map((c) => (
            <Tab.Screen
              key={c}
              name={c}
              component={TabScreen}
              options={{
                tabBarIcon: () => <Icon name="api" size={25} color="#000" />,
              }}
              initialParams={{
                categoryName: c,
                data: app.data[c],
              }}
            />
          ))}
        </Tab.Navigator>
      ) : (
        <Text>Loading data...</Text>
      )}
      <Player />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1 },
});

export default HomeScreen;

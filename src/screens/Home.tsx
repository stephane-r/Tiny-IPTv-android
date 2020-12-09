import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { isTablet } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabScreen from './Tab';
import { useApp, AppState, showDialogFavoris, setFavoris } from '../states/app';
import FavorisScreen from './Favoris';
import { Screen } from '../enums/Screen';
import TabBar from '../components/TabBar';
import DialogFavoris from '../components/DialogFavoris';
import AsyncStorage from '@react-native-community/async-storage';
import { Playlist } from '../enums/Playlist';

const Tab = createMaterialTopTabNavigator();

const TAB_NAVIGATOR_PROPS = () => {
  const props = {
    lazy: true,
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
    <View style={{ flex: 1 }}>
      {app?.categories ? (
        <Tab.Navigator {...TAB_NAVIGATOR_PROPS()}>
          <Tab.Screen
            name={Screen.Favoris}
            options={{
              tabBarIcon: () => <Icon name="favorite" size={25} color="#000" />,
            }}
            component={FavorisScreen}
          />
          {app.categories.map((c) => (
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
      {app?.dialog ? (
        <DialogFavoris
          visible={app.dialog.favoris.isOpen}
          toggleDialog={showDialogFavoris}
        />
      ) : null}
    </View>
  );
};

export default HomeScreen;

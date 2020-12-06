import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabScreen from './Tab';
import { useApp, AppState, showDialogFavoris, setFavoris } from '../states/app';
import FavorisScreen from './Favoris';
import { Screen } from '../enums/Screen';
import TabBar from '../components/TabBar';
import DialogFavoris from '../components/DialogFavoris';
import AsyncStorage from '@react-native-community/async-storage';
import { Playlist } from '../enums/Playlist';

const Tab = createMaterialTopTabNavigator();

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
        <Tab.Navigator
          lazy
          tabBar={(props) => <TabBar {...props} />}
          tabBarPosition="bottom">
          <Tab.Screen name={Screen.Favoris} component={FavorisScreen} />
          {app.categories.map((c) => (
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

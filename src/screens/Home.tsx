import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAsyncStorage } from 'use-async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Screen } from '../enums/Screen';
import { Playlist as PlaylistEnum } from '../enums/Playlist';
import { receiveData, useApp } from '../states/app';
import { getPlaylist } from '../api';
import TabScreen from './Tab';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [playlistId, setValue] = useAsyncStorage<string>(PlaylistEnum.id);
  const app = useApp();

  const onClearField = async () => {
    await setValue(null);
    return navigation.navigate(Screen.Home);
  };

  useEffect(() => {
    getPlaylist(playlistId).then(receiveData);
  }, [playlistId]);

  if (!playlistId) {
    return <View />;
  }

  return (
    <View style={styles.body}>
      <Button title="Logout" onPress={onClearField} />
      <Button
        title="Favoris"
        onPress={() => navigation.navigate(Screen.Favoris)}
      />
      {app?.categories ? (
        <Tab.Navigator
          lazy
          tabBarOptions={{
            scrollEnabled: true,
            tabStyle: {
              width: 100,
            },
            showIcon: true,
            showLabel: false,
          }}
          tabBarPosition="bottom">
          {app.categories.map((c) => (
            <Tab.Screen
              key={c}
              name={c}
              component={TabScreen}
              options={{
                tabBarIcon: () => <Icon name="api" size={25} color="#000" />,
              }}
              initialParams={{
                category: c,
              }}
            />
          ))}
        </Tab.Navigator>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  video: {
    width: 300,
    height: 200,
  },
});

export default HomeScreen;

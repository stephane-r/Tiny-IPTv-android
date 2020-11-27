import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Screen } from '../enums/Screen';
import { receiveData, useApp } from '../states/app';
import { getPlaylist } from '../api';
import TabScreen from '../screens/Tab';

const Tab = createMaterialTopTabNavigator();

const Playlist = ({
  playlistId,
  clearFileId,
}: {
  playlistId: string;
  clearFileId: () => void;
}) => {
  const navigation = useNavigation();
  const app = useApp();

  useEffect(() => {
    getPlaylist(playlistId).then(receiveData);
  }, [playlistId]);

  return (
    <View style={styles.body}>
      <Button title="Logout" onPress={clearFileId} />
      <Button
        title="Favoris"
        onPress={() => navigation.navigate(Screen.Favoris)}
      />
      {app.categories ? (
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

export default Playlist;

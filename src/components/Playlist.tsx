import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { useAsyncStorage } from 'use-async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Screen } from '../enums/Screen';
import { Playlist as PlaylistEnum } from '../enums/Playlist';
import { receiveData, useApp } from '../states/app';

const callApi = (playlistId) =>
  fetch(
    `http://192.168.122.1:3000/playlist?playlistId=${playlistId}&country=fr`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((result) => result.json())
    .catch(console.log);

const TestScreen = () => {
  const app = useApp();
  const navigation = useNavigation();
  const { params } = useRoute();
  const [favoris, setFavoris] = useAsyncStorage<string[]>(
    PlaylistEnum.Favoris,
    [],
  );

  const addOrRemoveFromFavoris = (name: string): void => {
    if (favoris.includes(name)) {
      const favorisUpdated = favoris.filter((f) => f !== name);
      return setFavoris(favorisUpdated);
    }

    return setFavoris([...favoris, name]);
  };

  const renderItem = ({ item }) => (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate(Screen.Player, {
          source: item.url,
        })
      }>
      <View style={{ flex: 1 }}>
        <Button
          title={
            favoris?.includes(item.name)
              ? 'Remove from favoris'
              : 'Add to favoris'
          }
          onPress={() => addOrRemoveFromFavoris(item.name)}
        />
        <Image
          source={{
            uri: item.tvg.logo
              ? item.tvg.logo
              : 'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png',
          }}
          style={{ width: 200, height: 100 }}
        />
        <Text>{item.name}</Text>
      </View>
    </TouchableNativeFeedback>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={2}
        data={app.data[params.category]}
        renderItem={renderItem}
        keyExtractor={({ name }) => name}
      />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const Playlist = ({ playlistId, clearFileId }) => {
  const navigation = useNavigation();
  const app = useApp();

  useEffect(() => {
    callApi(playlistId).then((result) => {
      receiveData(result);
    });
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
          tabBarOptions={{
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: 'powderblue' },
            showIcon: true,
            showLabel: false,
          }}
          tabBarPosition="bottom">
          {app.categories.map((c) => (
            <Tab.Screen
              key={c}
              name={c}
              component={TestScreen}
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

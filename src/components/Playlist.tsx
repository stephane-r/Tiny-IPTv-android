import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Screen } from '../enums/Screen';
import Player from './Player';

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

const Playlist = ({ playlistId, clearFileId }) => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [source, setSource] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    callApi(playlistId).then((result) => {
      setData(result.data);
      setCategories(result.categories);
    });
  }, [playlistId]);

  const renderItem = ({ item }) => (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate(Screen.Player, {
          source: item.url,
        })
      }>
      <View style={{ flex: 1 }}>
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

  const renderList = ({ item }) => (
    <View>
      <Text style={{ fontWeight: 'bold' }}>{item}</Text>
      <FlatList
        numColumns={2}
        data={data[item]}
        renderItem={renderItem}
        keyExtractor={({ name }) => name}
      />
    </View>
  );

  return (
    <View style={styles.body}>
      <Button title="Logout" onPress={clearFileId} />
      {categories ? (
        <FlatList
          numColumns={1}
          data={categories}
          renderItem={renderList}
          keyExtractor={(item) => item}
        />
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

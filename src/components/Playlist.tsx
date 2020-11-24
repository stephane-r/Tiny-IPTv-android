import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Player from './Player';

const callApi = (fileId) =>
  fetch(`http://192.168.122.1:3000/playlist?fileId=${fileId}&country=fr`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .catch(console.log);

const Playlist = ({fileId, clearFileId}) => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [source, setSource] = useState(null);

  useEffect(() => {
    callApi(fileId).then((result) => {
      setData(result.data);
      setCategories(result.categories);
    });
  }, [fileId]);

  const renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <Image
        source={{
          uri: item.tvg.logo
            ? item.tvg.logo
            : 'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png',
        }}
        style={{width: 200, height: 100}}
      />
      <TouchableHighlight onPress={() => setSource(item.url)}>
        <Text>{item.name}</Text>
      </TouchableHighlight>
    </View>
  );

  const renderList = ({item}) => (
    <View>
      <Text style={{fontWeight: 'bold'}}>{item}</Text>
      <FlatList
        numColumns={2}
        data={data[item]}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );

  return (
    <View style={styles.body}>
      <Button title="Logout" onPress={clearFileId} />
      {source && <Player source={source} />}
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

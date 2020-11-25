import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAsyncStorage } from 'use-async-storage';
import { Playlist } from '../enums/Playlist';

const FavorisScreen = ({ navigation }) => {
  const [favoris] = useAsyncStorage(Playlist.Favoris);

  if (!favoris) {
    return <Text>Loading favoris...</Text>;
  }

  if (favoris.length === 0) {
    return <Text>Favoris is empty</Text>;
  }

  return (
    <View>
      <Button title="back" onPress={() => navigation.goBack()} />
      {favoris.map((f) => (
        <Text key={f}>{f}</Text>
      ))}
    </View>
  );
};

export default FavorisScreen;

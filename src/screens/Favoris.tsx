import React from 'react';
import { Button, Text, View } from 'react-native';
import { useFavoris } from '../hooks/useFavoris';

const FavorisScreen = ({ navigation }) => {
  const { favoris, addOrRemoveFromFavoris, clearFavoris } = useFavoris();

  if (!favoris) {
    return <Text>Loading favoris...</Text>;
  }

  if (favoris.length === 0) {
    return <Text>Favoris is empty</Text>;
  }

  return (
    <View>
      <Button title="back" onPress={() => navigation.goBack()} />
      <Button title="Clear all favoris" onPress={clearFavoris} />
      {favoris.map((f) => (
        <View key={f.name}>
          <Button title="Remove" onPress={() => addOrRemoveFromFavoris(f)} />
          <Text key={f}>{f?.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default FavorisScreen;

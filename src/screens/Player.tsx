import React from 'react';
import { Button, View } from 'react-native';
import Player from '../components/Player';
import { useRoute } from '@react-navigation/native';

const PlayerScreen = ({ navigation }) => {
  const { params } = useRoute();

  return (
    <View>
      <Button title="back" onPress={() => navigation.goBack()} />
      <Player source={params.source} />
    </View>
  );
};

export default PlayerScreen;

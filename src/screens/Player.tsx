import React from 'react';
import Player from '../components/Player';
import { useRoute } from '@react-navigation/native';

const PlayerScreen = () => {
  const { params } = useRoute();
  return <Player source={params.source} />;
};

export default PlayerScreen;

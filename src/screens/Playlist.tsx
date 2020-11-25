import React from 'react';
import { View } from 'react-native';
import { useAsyncStorage } from 'use-async-storage';
import Playlist from '../components/Playlist';
import { Screen } from '../enums/Screen';
import { Playlist as PlaylistEnum } from '../enums/Playlist';

const PlaylistScreen = ({ navigation }) => {
  const [value, setValue] = useAsyncStorage<string>(PlaylistEnum.id);

  const onClearField = async () => {
    await setValue(null);
    return navigation.navigate(Screen.Home);
  };

  if (!value) {
    return <View />;
  }

  return <Playlist playlistId={value} clearFileId={onClearField} />;
};

export default PlaylistScreen;

import React from 'react';
import { StyleSheet, View } from 'react-native';
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

  return (
    <View style={styles.body}>
      <Playlist playlistId={value} clearFileId={onClearField} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlaylistScreen;

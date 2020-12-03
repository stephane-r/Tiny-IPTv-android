import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAndReceivePlaylist } from '../api';
import { Playlist } from '../enums/Playlist';
import { Screen } from '../enums/Screen';

const onAppRender = (navigate) => {
  AsyncStorage.getItem(Playlist.id).then(async (result) => {
    const parsedValue = JSON.parse(result);
    const startScreen =
      parsedValue === null || parsedValue === undefined
        ? Screen.Login
        : Screen.Home;

    if (startScreen === Screen.Home) {
      await getAndReceivePlaylist(parsedValue);
    }

    return navigate(startScreen);
  });
};

const LoadingScreen = ({ navigation }) => {
  useEffect(() => onAppRender(navigation.navigate));

  return (
    <View style={styles.body}>
      <Text>Loading app...</Text>
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

export default LoadingScreen;

import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getAndReceivePlaylist } from '../api';
import { Playlist } from '../enums/Playlist';
import { Screen } from '../enums/Screen';
import { showSnakbar } from '../states/app';

const onAppRender = (navigate) => {
  AsyncStorage.getItem(Playlist.id).then(async (result) => {
    const parsedValue = JSON.parse(result);
    const startScreen =
      parsedValue === null || parsedValue === undefined
        ? Screen.Login
        : Screen.Home;

    if (startScreen === Screen.Home) {
      try {
        await getAndReceivePlaylist(parsedValue);
      } catch (error) {
        setTimeout(
          () =>
            showSnakbar({
              message: `Can not login with ${result}`,
            }),
          1000,
        );
        return navigate(Screen.Login);
      }
    }

    return navigate(startScreen);
  });
};

const LoadingScreen = ({ navigation }) => {
  useEffect(() => onAppRender(navigation.navigate));

  return (
    <View style={styles.body}>
      <ActivityIndicator size="large" />
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

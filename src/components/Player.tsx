/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import VLCPlayer from 'react-native-vlc-player';
import { useAnimation } from 'react-native-animation-hooks';
import { AppState, setSource, useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { isTablet } from 'react-native-device-info';
import { Screen } from '../enums/Screen';
import { useNavigation } from '@react-navigation/native';

const Player = () => {
  const app: AppState = useApp();
  const navigation = useNavigation();
  const translateY = useAnimation({
    toValue: app.source.visible ? 0 : 500,
    type: 'spring',
    useNativeDriver: true,
  });

  const togglePlayerStyles = () => {
    setSource({ uri: app.source.uri, visible: false });
    setTimeout(
      () => navigation.navigate(Screen.Player, { source: app.source.uri }),
      400,
    );
  };

  useEffect(() => {}, []);

  return (
    <Animated.View
      style={[
        styles.playerContainer,
        {
          transform: [
            {
              translateY: translateY,
            },
          ],
          right: isTablet() ? 50 : 15,
          bottom: isTablet() ? 50 : 65,
        },
      ]}>
      {app.source.visible ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 2,
            }}>
            <TouchableNativeFeedback
              style={
                isTablet() ? styles.playerPipMedium : styles.playerPipSmall
              }
              onPress={togglePlayerStyles}
            />
          </View>
          <VLCPlayer
            style={isTablet() ? styles.playerPipMedium : styles.playerPipSmall}
            paused={false}
            autoplay={true}
            source={{
              uri: app.source.uri,
              autoplay: true,
              initOptions: ['--codec=avcodec'],
            }}
          />
        </>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'black',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerPipSmall: {
    width: 300,
    height: 170,
  },
  playerPipMedium: {
    width: 480,
    height: 270,
  },
});

export default memo(Player);

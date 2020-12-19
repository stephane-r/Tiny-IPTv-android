/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useRef } from 'react';
import VLCPlayer from 'react-native-vlc-player';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { AppState, setSource, useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { isTablet } from 'react-native-device-info';
import { Screen } from '../enums/Screen';
import { useNavigation } from '@react-navigation/core';

const Player = () => {
  const app: AppState = useApp();
  const navigation = useNavigation();
  const opacity = useAnimation({
    toValue: app.source.visible ? 1 : 0,
    type: 'spring',
    useNativeDriver: true,
    delay: 200,
  });
  const scale = useAnimation({
    toValue: app.source.visible ? 1 : 0.7,
    type: 'spring',
    useNativeDriver: true,
    delay: 200,
  });

  const togglePlayerStyles = () => {
    setSource({ uri: app.source.uri, visible: false });
    navigation.navigate(Screen.Player, { source: app.source.uri });
  };

  useEffect(() => {}, []);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () =>
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      }),
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => pan.flattenOffset(),
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.playerContainer,
          {
            opacity,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { scale },
            ],
            right: isTablet() ? 50 : 15,
            bottom: isTablet() ? 50 : 65,
          },
        ]}
        {...panResponder.panHandlers}>
        {app.source.uri ? (
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
              <Pressable
                style={
                  isTablet() ? styles.playerPipMedium : styles.playerPipSmall
                }
                onPress={togglePlayerStyles}
              />
            </View>
            <VLCPlayer
              style={
                isTablet() ? styles.playerPipMedium : styles.playerPipSmall
              }
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
    </View>
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

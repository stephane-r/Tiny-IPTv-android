/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useRef, useState } from 'react';
import { VLCPlayer } from '@imokhles/react-native-vlc';
import {
  Animated,
  PanResponder,
  TouchableNativeFeedback,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { AppState, setFullscreen, useApp } from '../states/app';
import { isTablet } from 'react-native-device-info';
import PlayerControls from './PlayerControls';
import usePlayer from '../hooks/usePlayer';
import PlayerLoader from './PlayerLoader';
import { useAndroidBackHandler } from 'react-navigation-backhandler';

const Player = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { controls, showControls, playerDimensions, stopPlayer } = usePlayer();
  const app: AppState = useApp();
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

  const { fullscreen } = app.source;

  const togglePlayerStyles = () => {
    StatusBar.setHidden(!fullscreen);

    if (!fullscreen) {
      pan.setValue({
        x: 0,
        y: 0,
      });
    }

    return setFullscreen(!fullscreen);
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dy) > 5,
    onPanResponderGrant: () =>
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      }),
    onPanResponderMove:
      !fullscreen &&
      Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
    onPanResponderRelease: () => pan.flattenOffset(),
  });

  useAndroidBackHandler(() => {
    if (fullscreen) {
      setFullscreen(false);
      return true;
    }

    return false;
  });

  return (
    <Animated.View
      style={[
        styles.playerContainer,
        playerDimensions,
        {
          opacity,
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
          backgroundColor: 'black',
          right: fullscreen ? 0 : isTablet() ? 50 : 15,
          bottom: fullscreen ? 0 : isTablet() ? 50 : 65,
        },
      ]}
      {...panResponder.panHandlers}>
      {isLoading && <PlayerLoader />}
      {!Platform.isTV && (
        <PlayerControls
          playerIsFullscreen={fullscreen}
          controlsIsShow={controls}
          showControls={showControls}
          onFullscreenPress={togglePlayerStyles}
          onStopPress={stopPlayer}
        />
      )}
      {app.source.uri ? (
        <TouchableNativeFeedback onPress={(): void => showControls(true)}>
          <VLCPlayer
            style={playerDimensions}
            source={{
              uri: app.source.uri,
            }}
            onPlaying={(): void => {
              setIsLoading(false);

              if (Platform.isTV) {
                setFullscreen(true);
              }
            }}
            onStopped={(): void => setIsLoading(true)}
            onBuffering={(): void => setIsLoading(true)}
            onProgress={(): void => setIsLoading(false)}
          />
        </TouchableNativeFeedback>
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
});

export default memo(Player);

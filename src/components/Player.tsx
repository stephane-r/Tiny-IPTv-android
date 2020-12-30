/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useRef, useState } from 'react';
import { VLCPlayer } from '@imokhles/react-native-vlc';
import {
  Animated,
  Dimensions,
  PanResponder,
  TouchableNativeFeedback,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  BackHandler,
  Pressable,
  Text,
} from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { AppState, setSource, useApp } from '../states/app';
import { isTablet } from 'react-native-device-info';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { useDeviceOrientation } from '@react-native-community/hooks';
import LinearGradient from 'react-native-linear-gradient';
import PlayerControls from './PlayerControls';

const getWindowDimension = () => ({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

const Player = () => {
  const orientation = useDeviceOrientation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreen, setIsFullscreen] = useState(Platform.isTV);
  const [fullscreenDimensions, setFullscreenDimensions] = useState(
    getWindowDimension(),
  );
  const [controls, showControls] = useState(false);
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
  const controlsOpacity = useAnimation({
    toValue: controls ? 1 : 0,
    type: 'spring',
    useNativeDriver: true,
    delay: 200,
  });

  const togglePlayerStyles = () => {
    StatusBar.setHidden(!fullscreen);

    if (!fullscreen) {
      pan.setValue({
        x: 0,
        y: 0,
      });
    }

    return setIsFullscreen(!fullscreen);
  };

  useEffect(() => {
    setFullscreenDimensions(getWindowDimension());

    if (Platform.isTV) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (fullscreen) {
          setIsFullscreen(false);
        }

        return false;
      });
    }

    if (controls) {
      setTimeout(() => showControls(false), 3000);
    }
  }, [orientation, fullscreen, controls]);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
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

  const playerDimensions = fullscreen
    ? fullscreenDimensions
    : isTablet()
    ? styles.playerPipMedium
    : styles.playerPipSmall;

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
      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      <PlayerControls
        playerIsFullscreen={fullscreen}
        controlsIsShow={controls}
        showControls={showControls}
        onFullscreenPress={togglePlayerStyles}
        onStopPress={() =>
          setSource({
            uri: null,
            visible: false,
          })
        }
      />
      {app.source.uri ? (
        <TouchableNativeFeedback onPress={() => showControls(true)}>
          <VLCPlayer
            style={playerDimensions}
            source={{
              uri: app.source.uri,
            }}
            onPlaying={() => setIsLoading(false)}
            onStopped={() => setIsLoading(true)}
            onBuffering={() => setIsLoading(true)}
            onProgress={() => setIsLoading(false)}
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

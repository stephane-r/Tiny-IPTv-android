/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { useAnimation } from 'react-native-animation-hooks';
import { useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { isTablet } from 'react-native-device-info';
import { useDeviceOrientation } from '@react-native-community/hooks';

const getWindowDimension = () => ({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

const Player = () => {
  const orientation = useDeviceOrientation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreen, setIsFullscreen] = useState(false);
  const [fullscreenDimensions, setFullscreenDimensions] = useState(
    getWindowDimension(),
  );
  const player = useRef();
  const app = useApp();
  const translateY = useAnimation({
    toValue: app.source ? 0 : 500,
    type: 'spring',
    useNativeDriver: true,
  });

  const togglePlayerStyles = () => setIsFullscreen(!fullscreen);

  useEffect(() => {
    setFullscreenDimensions(getWindowDimension());
  }, [orientation]);

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
          right: fullscreen ? 0 : isTablet() ? 50 : 15,
          bottom: fullscreen ? 0 : isTablet() ? 50 : 65,
        },
      ]}>
      {isLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
      {app.source ? (
        <TouchableNativeFeedback onPress={togglePlayerStyles}>
          <Video
            ref={player}
            style={
              fullscreen
                ? fullscreenDimensions
                : isTablet()
                ? styles.playerPipMedium
                : styles.playerPipSmall
            }
            paused={false}
            autoplay={true}
            resizeMode="contain"
            source={{
              uri: app.source,
              type: 'mpeg',
            }}
            onLoadStart={() => setIsLoading(true)}
            onError={(error) => alert(JSON.stringify(error))}
            onLoad={() => setIsLoading(false)}
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

export default Player;

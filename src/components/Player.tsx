import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import VlcPlayer from 'react-native-vlc-player';
import { useAnimation } from 'react-native-animation-hooks';
import { useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const INITIAL_PLAYER_DIMENSIONS = {
  width: 480,
  height: 270,
};

const Player = () => {
  const app = useApp();
  const opacity = useAnimation({
    toValue: app.source ? 1 : 0.5,
    type: 'spring',
    useNativeDriver: true,
  });
  const translateY = useAnimation({
    toValue: app.source ? 0 : 500,
    type: 'spring',
    useNativeDriver: true,
  });

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
          opacity,
        },
      ]}>
      {app.source ? (
        <VlcPlayer
          style={INITIAL_PLAYER_DIMENSIONS}
          paused={false}
          autoplay={true}
          source={{
            uri: app.source,
            autoplay: true,
            initOptions: ['--codec=avcodec'],
          }}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 2,
    padding: 50,
  },
});

export default Player;

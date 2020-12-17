/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useAnimation } from 'react-native-animation-hooks';
import { useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const Player = () => {
  const [playerStyles, setPlayerStyles] = useState(styles.playerSmall);
  const player = useRef();
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

  const isPipSize = playerStyles.width === styles.playerSmall.width;

  const togglePlayerStyles = () => {
    if (isPipSize) {
      return setPlayerStyles(styles.playerFull);
    }

    return setPlayerStyles(styles.playerSmall);
  };

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
          right: isPipSize ? 50 : 0,
          bottom: isPipSize ? 50 : 0,
        },
      ]}>
      {app.source ? (
        <TouchableNativeFeedback onPress={togglePlayerStyles}>
          <Video
            ref={player}
            style={playerStyles}
            paused={false}
            autoplay={true}
            resizeMode="contain"
            source={{
              uri: app.source,
              type: 'mpeg',
            }}
            onError={console.log}
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
  playerSmall: {
    width: 480,
    height: 270,
  },
  playerFull: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - StatusBar.currentHeight,
  },
});

export default Player;

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useAnimation } from 'react-native-animation-hooks';
import { useApp } from '../states/app';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const INITIAL_PLAYER_DIMENSIONS = {
  width: 480,
  height: 270,
};

const FULL_SCREEN_PLAYER_DIMENSIONS = {
  width: Dimensions.get('window').width - 100,
  height: Dimensions.get('window').height - StatusBar.currentHeight - 100,
};

const Player = () => {
  const [playerDimensions, setPlayerDimensions] = useState(
    INITIAL_PLAYER_DIMENSIONS,
  );
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

  const togglePlayerDimensions = () => {
    if (playerDimensions.width === INITIAL_PLAYER_DIMENSIONS.width) {
      return setPlayerDimensions(FULL_SCREEN_PLAYER_DIMENSIONS);
    }

    return setPlayerDimensions(INITIAL_PLAYER_DIMENSIONS);
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
        },
      ]}>
      {app.source ? (
        <TouchableNativeFeedback onPress={togglePlayerDimensions}>
          <Video
            ref={player}
            style={playerDimensions}
            paused={false}
            autoplay={true}
            resizeMode="cover"
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
    right: 50,
    bottom: 50,
    zIndex: 2,
    backgroundColor: 'red',
  },
});

export default Player;

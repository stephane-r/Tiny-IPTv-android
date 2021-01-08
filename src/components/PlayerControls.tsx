import React, { memo } from 'react';
import { Animated, StyleSheet, View, Pressable } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  playerIsFullscreen: boolean;
  controlsIsShow: boolean;
  showControls: () => void;
  onStopPress: () => void;
  onFullscreenPress: () => void;
}

const PlayerControls = ({
  playerIsFullscreen,
  controlsIsShow,
  showControls,
  onStopPress,
  onFullscreenPress,
}: Props) => {
  const opacity = useAnimation({
    toValue: controlsIsShow ? 1 : 0,
    type: 'spring',
    useNativeDriver: true,
    delay: 200,
  });

  const ICON_SIZE = playerIsFullscreen ? 40 : 30;
  const ICON_FULLSCREEN = playerIsFullscreen ? 'fullscreen-exit' : 'fullscreen';

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            opacity,
          },
        ]}>
        {!controlsIsShow && (
          <Pressable
            onPress={() => showControls(true)}
            style={styles.pressable}
          />
        )}
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradient}>
          <IconButton
            icon="stop"
            color="white"
            onPress={onStopPress}
            size={ICON_SIZE}
          />
          <IconButton
            icon={ICON_FULLSCREEN}
            color="white"
            onPress={onFullscreenPress}
            animated
            size={ICON_SIZE}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  animatedView: {
    flex: 1,
    height: '100%',
  },
  pressable: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
    height: 100,
  },
});

export default memo(PlayerControls);

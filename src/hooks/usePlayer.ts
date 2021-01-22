import { useEffect, useState } from 'react';
import { isTablet } from 'react-native-device-info';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { Dimensions, StyleSheet } from 'react-native';
import {
  PlayerState,
  usePlayerState,
  setSource,
  setFullscreen,
} from '../states/player';

interface UsePlayerHook {
  fullscreen: boolean;
  setIsFullscreen: () => void;
  playerDimensions: {
    width: number;
    height: number;
  };
  controls: boolean;
  showControls: () => void;
  stopPlayer: () => void;
}

const getWindowDimension = (): { width: number; height: number } => ({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

const usePlayer = (): UsePlayerHook => {
  const orientation = useDeviceOrientation();
  const { player }: PlayerState = usePlayerState();
  const [fullscreenDimensions, setFullscreenDimensions] = useState(
    getWindowDimension(),
  );
  const [controls, showControls] = useState(false);

  useEffect(() => {
    setFullscreenDimensions(getWindowDimension());

    if (controls) {
      setTimeout(() => showControls(false), 3000);
    }
  }, [orientation, controls]);

  const playerDimensions = player.fullscreen
    ? fullscreenDimensions
    : isTablet()
    ? styles.playerPipMedium
    : styles.playerPipSmall;

  const stopPlayer = (): void =>
    setSource({
      uri: null,
      visible: false,
    });

  return {
    playerDimensions,
    controls,
    showControls,
    stopPlayer,
    player,
    setFullscreen,
  };
};

const styles = StyleSheet.create({
  playerPipSmall: {
    width: 300,
    height: 170,
  },
  playerPipMedium: {
    width: 480,
    height: 270,
  },
});

export default usePlayer;

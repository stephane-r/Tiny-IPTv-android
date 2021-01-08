import { useEffect, useState } from 'react';
import { isTablet } from 'react-native-device-info';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { Dimensions, StyleSheet } from 'react-native';
import { AppState, setSource, useApp } from '../states/app';

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

const getWindowDimension = (): UsePlayerHook => ({
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
});

const usePlayer = () => {
  const orientation = useDeviceOrientation();
  const app: AppState = useApp();
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

  const playerDimensions = app.source.fullscreen
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

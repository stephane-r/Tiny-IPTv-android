import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import VLCPlayer from 'react-native-vlc-player';
import { setSource } from '../states/app';
import { Chip } from 'react-native-paper';
import { isTablet } from 'react-native-device-info';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  return Boolean(dim.height >= dim.width);
};

const PlayerScreen = () => {
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const [isLandscape, setIsLandscape] = useState(!isPortrait());

  useEffect(() => {
    setSource({
      uri: null,
      visible: false,
    });

    Dimensions.addEventListener('change', (event) => {
      const { window } = event;
      setIsLandscape(window.width > window.height);
    });

    return () =>
      setSource({
        uri: params.source,
        visible: true,
      });
  });

  return (
    <View style={{ flex: 1 }}>
      {isLandscape && isFocused ? (
        <VLCPlayer
          style={{
            width: Dimensions.get('window').width,
            height:
              Dimensions.get('window').height -
              (isTablet() ? StatusBar.currentHeight : 0),
          }}
          paused={false}
          autoplay={true}
          source={{
            uri: params.source,
            autoplay: true,
            initOptions: ['--codec=avcodec'],
          }}
        />
      ) : (
        <Chip icon="information" style={{ justifyContent: 'center' }}>
          Please rotate your device
        </Chip>
      )}
    </View>
  );
};

export default PlayerScreen;

import React, { useEffect } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import VLCPlayer from 'react-native-vlc-player';
import { isTablet } from 'react-native-device-info';
import { setSource } from '../states/app';

const PlayerScreen = () => {
  const { params } = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    setSource({
      uri: null,
      visible: false,
    });

    return () =>
      setSource({
        uri: params.source,
        visible: true,
      });
  });

  return (
    <View style={{ flex: 1 }}>
      {isFocused && (
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
      )}
    </View>
  );
};

export default PlayerScreen;

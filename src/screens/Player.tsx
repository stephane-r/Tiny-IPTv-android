import React from 'react';
import VlcPlayer from 'react-native-vlc-player';
import { useRoute } from '@react-navigation/native';
import { Dimensions, StatusBar, View } from 'react-native';

const PlayerScreen = () => {
  const { params } = useRoute();
  // return <Text>{params.source}</Text>;
  return (
    <View style={{ backgroundColor: 'red' }}>
      <VlcPlayer
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height - StatusBar.currentHeight,
        }}
        paused={false}
        autoplay={true}
        source={{
          uri: params.source,
          autoplay: true,
          initOptions: ['--codec=avcodec'],
        }}
      />
    </View>
  );
};

export default PlayerScreen;

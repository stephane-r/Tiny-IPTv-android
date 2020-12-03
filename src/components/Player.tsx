import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import VlcPlayer from 'react-native-vlc-player';

interface PlayerProps {
  source: string;
}

const Player = ({ source }: PlayerProps) => (
  <VlcPlayer
    style={styles.video}
    paused={false}
    autoplay={true}
    source={{
      uri: source,
      autoplay: true,
      initOptions: ['--codec=avcodec'],
    }}
  />
);

const styles = StyleSheet.create({
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Player;

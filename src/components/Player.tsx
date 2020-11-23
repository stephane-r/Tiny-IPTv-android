import React from 'react';
import {StyleSheet} from 'react-native';
import VlcPlayer from 'react-native-vlc-player';

const Player = ({source}) => (
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
    width: 300,
    height: 200,
  },
});

export default Player;

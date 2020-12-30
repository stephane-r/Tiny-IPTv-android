import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const PlayerLoader = () => (
  <View style={styles.activityIndicator}>
    <ActivityIndicator color="white" size="large" />
  </View>
);

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerLoader;

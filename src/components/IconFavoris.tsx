import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconFavoris: React.FC = () => (
  <View style={styles.icon}>
    <Icon name="favorite" size={18} color="white" />
  </View>
);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#b7a742',
    elevation: 6,
  },
});

export default IconFavoris;

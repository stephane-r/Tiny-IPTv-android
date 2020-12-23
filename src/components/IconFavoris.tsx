/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconFavoris: React.FC = ({ isActive }) => (
  <View
    style={[
      styles.iconTvAbsolute,
      styles.icon,
      {
        backgroundColor: isActive ? '#b7a742' : 'white',
      },
    ]}>
    <Icon name="favorite" size={18} color={isActive ? 'white' : '#b7a742'} />
  </View>
);

const IconFavorisButton: React.FC = ({ onPress, isActive }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={[styles.iconAbsolute, styles.buttonContainer]}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: isActive ? '#b7a742' : 'white',
          },
        ]}>
        <Icon
          name="favorite"
          size={18}
          color={isActive ? 'white' : '#b7a742'}
        />
      </View>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  iconAbsolute: {
    position: 'absolute',
    top: isTablet() ? 0 : -2,
    right: isTablet() ? 15 : 8,
    zIndex: 2,
  },
  iconTvAbsolute: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#b7a742',
    elevation: 6,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { IconFavoris, IconFavorisButton };

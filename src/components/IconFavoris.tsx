import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconFavoris: React.FC = () => (
  <View style={[styles.iconAbsolute, styles.icon]}>
    <Icon name="favorite" size={18} color="white" />
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
    top: 0,
    right: 15,
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

import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getQualityIcon from '../utils/getQualityIcon';

const TAB_BAR_WIDTH: number = 60;

const TabBar = ({ state, navigation }) => (
  <View style={styles.list}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;

      const onPress = (): void => {
        if (!isFocused) {
          navigation.navigate(route.name);
        }
      };

      return (
        <TouchableNativeFeedback key={route.key} onPress={onPress}>
          <LinearGradient
            style={styles.item}
            colors={
              isFocused
                ? ['transparent', '#5a5a5a', 'transparent']
                : ['transparent', 'transparent']
            }>
            <Icon
              {...getQualityIcon(route.name)}
              color={isFocused ? '#b7a742' : '#3b3b3b'}
            />
          </LinearGradient>
        </TouchableNativeFeedback>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: TAB_BAR_WIDTH,
    height: Dimensions.get('window').height - StatusBar.currentHeight,
  },
  item: {
    flex: 1,
    maxHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
export { TAB_BAR_WIDTH };

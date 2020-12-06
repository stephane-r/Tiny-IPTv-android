/* eslint-disable react-native/no-inline-styles */
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
import useAuth from '../hooks/useAuth';

const TAB_BAR_WIDTH = 60;
const TAB_ICONS = [
  'favorite',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'sports-football',
];

const TabBar = ({ state, descriptors, navigation }) => {
  const { logout } = useAuth();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        width: TAB_BAR_WIDTH,
        height: Dimensions.get('window').height - StatusBar.currentHeight,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = (): void =>
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });

        return (
          <TouchableNativeFeedback
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}>
            <LinearGradient
              style={styles.item}
              colors={
                isFocused
                  ? ['transparent', '#5a5a5a', 'transparent']
                  : ['transparent', 'transparent']
              }>
              <Icon
                name={TAB_ICONS[index]}
                size={25}
                color={isFocused ? '#b7a742' : '#3b3b3b'}
              />
            </LinearGradient>
          </TouchableNativeFeedback>
        );
      })}
      <TouchableNativeFeedback accessibilityRole="button" onPress={logout}>
        <View style={styles.item}>
          <Icon name="api" size={25} color="#3b3b3b" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
export { TAB_BAR_WIDTH, TAB_ICONS };

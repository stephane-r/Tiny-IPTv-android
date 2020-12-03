import React from 'react';
import { Dimensions, TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TAB_BAR_WIDTH = 60;
const TAB_ICONS = ['api', 'api', 'api', 'api', 'api', 'api', 'sports-football'];

const TabBar = ({ state, descriptors, navigation }) => {
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
        backgroundColor: '#1d1d1d',
        width: TAB_BAR_WIDTH,
        height: Dimensions.get('window').height - 150,
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
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isFocused ? 'white' : 'transparent',
              }}>
              <Icon
                name={TAB_ICONS[index]}
                size={25}
                color={isFocused ? '#1d1d1d' : '#3b3b3b'}
              />
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </View>
  );
};

export default TabBar;
export { TAB_BAR_WIDTH, TAB_ICONS };

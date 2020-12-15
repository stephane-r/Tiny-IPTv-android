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

const TAB_BAR_WIDTH: number = 60;
const TAB_ICONS: string[] = [
  'favorite',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'ondemand-video',
  'sports-football',
];

const TabBar = ({ state, navigation }) => {
  const { logout } = useAuth();

  return (
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
                name={TAB_ICONS[index]}
                size={25}
                color={isFocused ? '#b7a742' : '#3b3b3b'}
              />
            </LinearGradient>
          </TouchableNativeFeedback>
        );
      })}
      <TouchableNativeFeedback
        accessibilityRole="button"
        onPress={() => navigation.navigate('Settings')}>
        <View style={styles.item}>
          <Icon name="settings" size={25} color="#3b3b3b" />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback accessibilityRole="button" onPress={logout}>
        <View style={styles.item}>
          <Icon name="logout" size={25} color="#3b3b3b" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

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
export { TAB_BAR_WIDTH, TAB_ICONS };

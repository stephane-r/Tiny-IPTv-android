import React, { memo } from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { isTablet } from 'react-native-device-info';
import { Text } from 'react-native-paper';
import { Screen } from '../enums/Screen';
import { Channel as ChannelType } from '../types';
import { IconFavoris, IconFavorisButton } from './IconFavoris';

const Channel: React.FC = ({
  item,
  isFavoris,
  addOrRemoveFromFavoris,
  navigation,
}: {
  item: ChannelType;
  favoris: string[];
  addOrRemoveFromFavoris: (channel: ChannelType) => void;
  navigation: () => void;
}) => (
  <>
    {Platform.isTV && isFavoris ? (
      <IconFavoris />
    ) : (
      <IconFavorisButton
        onPress={() => addOrRemoveFromFavoris(item)}
        isActive={isFavoris}
      />
    )}
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate(Screen.Player, {
          source: item.url,
        })
      }
      onLongPress={() => addOrRemoveFromFavoris(item)}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: item.tvg.logo
              ? item.tvg.logo
              : 'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png',
          }}
          style={{ width: 160, height: 80 }}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableNativeFeedback>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: isTablet() ? 200 : 180,
    height: isTablet() ? 200 : 180,
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: isTablet() ? 15 : 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  name: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 6,
  },
});

export default memo(Channel);

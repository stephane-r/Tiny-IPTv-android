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
import { setSource } from '../states/app';
import { Channel as ChannelType } from '../types';
import { IconFavoris, IconFavorisButton } from './IconFavoris';

const IMAGE_PLACEHOLDER =
  'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png';

const Channel: React.FC = ({
  item,
  isFavoris,
  addOrRemoveFromFavoris,
}: {
  item: ChannelType;
  favoris: string[];
  addOrRemoveFromFavoris: (channel: ChannelType) => void;
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
        setSource({
          uri: item.url,
          visible: true,
        })
      }
      onLongPress={() => addOrRemoveFromFavoris(item)}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: item.tvg.logo ? item.tvg.logo : IMAGE_PLACEHOLDER,
          }}
          style={styles.imageBackground}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableNativeFeedback>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: isTablet() ? 200 : 150,
    height: isTablet() ? 200 : 150,
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
  imageBackground: {
    width: isTablet() ? 160 : 100,
    height: isTablet() ? 80 : 50,
  },
});

export default memo(Channel);

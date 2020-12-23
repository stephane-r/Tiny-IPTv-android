import React, { memo, useState } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text,
  Animated,
} from 'react-native';
import { isTablet } from 'react-native-device-info';
import { setSource } from '../states/app';
import { Channel as ChannelType } from '../types';
import { IconFavoris, IconFavorisButton } from './IconFavoris';
import FastImage from 'react-native-fast-image';
import { useAnimation } from 'react-native-animation-hooks';

const IMAGE_PLACEHOLDER =
  'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png';

const Channel: React.FC = ({
  item,
  isFavoris,
  addOrRemoveFromFavoris,
  categoryName,
}: {
  item: ChannelType;
  favoris: string[];
  addOrRemoveFromFavoris: (channel: ChannelType) => void;
  categoryName: string;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const scale = useAnimation({
    toValue: isFocus ? 1.1 : 1,
    type: 'spring',
    useNativeDriver: true,
    delay: 100,
  });

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {Platform.isTV ? (
        <IconFavoris isActive={isFavoris} />
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
        onFocus={onFocus}
        onBlur={onBlur}
        onLongPress={() => addOrRemoveFromFavoris(item)}>
        <View style={styles.container}>
          <FastImage
            style={styles.imageBackground}
            source={{
              uri: item.tvg.logo ? item.tvg.logo : IMAGE_PLACEHOLDER,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.name}>{item.name.replace(categoryName, '')}</Text>
        </View>
      </TouchableNativeFeedback>
    </Animated.View>
  );
};

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
  focus: {
    transform: [{ scale: 1.1 }],
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

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Screen } from '../enums/Screen';
import { toggleDialogFavoris } from '../states/app';
import { Channel as ChannelType } from '../types';
import IconFavoris from './IconFavoris';

const Channel: React.FC = ({
  item,
  isFavoris,
}: {
  item: ChannelType;
  favoris: string[];
}) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate(Screen.Player, {
          source: item.url,
        })
      }
      onLongPress={() => toggleDialogFavoris(true, item)}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: item.tvg.logo
              ? item.tvg.logo
              : 'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png',
          }}
          style={{ width: 160, height: 80 }}
        />
        {isFavoris && <IconFavoris />}
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 15,
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

export default Channel;

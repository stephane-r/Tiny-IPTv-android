import { CommonActions } from '@react-navigation/native';
import React from 'react';
import {
  Button,
  Image,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Screen } from '../enums/Screen';
import { Channel as ChannelType } from '../types';

const Channel: React.FC = ({
  item,
  navigation,
  addOrRemoveFromFavoris,
  favoris,
}: {
  item: ChannelType;
  navigation: CommonActions;
  addOrRemoveFromFavoris: (name: string) => void;
  favoris: string[];
}) => (
  <TouchableNativeFeedback
    onPress={() =>
      navigation.navigate(Screen.Player, {
        source: item.url,
      })
    }>
    <View style={{ flex: 1 }}>
      <Button
        title={
          favoris?.includes(item.name)
            ? 'Remove from favoris'
            : 'Add to favoris'
        }
        onPress={() => addOrRemoveFromFavoris(item.name)}
      />
      <Image
        source={{
          uri: item.tvg.logo
            ? item.tvg.logo
            : 'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png',
        }}
        style={{ width: 200, height: 100 }}
      />
      <Text>{item.name}</Text>
    </View>
  </TouchableNativeFeedback>
);

export default Channel;

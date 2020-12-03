import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Screen } from '../enums/Screen';
import { Channel as ChannelType } from '../types';

const Channel: React.FC = ({
  item,
  addOrRemoveFromFavoris,
  favorisIds,
}: {
  item: ChannelType;
  addOrRemoveFromFavoris: (name: string) => void;
  favoris: string[];
}) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate(Screen.Player, {
          source: item.url,
        })
      }>
      <View style={styles.container}>
        {/* <Button
          title={
            favorisIds?.includes(item.name)
              ? 'Remove from favoris'
              : 'Add to favoris'
          }
          onPress={() => addOrRemoveFromFavoris(item)}
        /> */}
        <ImageBackground
          source={{
            uri: item.tvg.logo
              ? item.tvg.logo
              : 'https://www.semencesdefrance.com/wp-content/uploads/2020/01/placeholder.png',
          }}
          style={{ width: 200, height: 100 }}
        />
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
    backgroundColor: '#d3d3d3',
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  name: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
});

export default Channel;

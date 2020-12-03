import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useFavoris } from '../hooks/useFavoris';
import { Channel as ChannelType } from '../types';
import Channel from './Channel';

const ChannelGroup: React.FC = ({ item }: { item: ChannelType }) => {
  const { addOrRemoveFromFavoris, favorisIds } = useFavoris();

  const renderChannel = (props) => (
    <Channel
      item={props.item}
      addOrRemoveFromFavoris={addOrRemoveFromFavoris}
      favorisIds={favorisIds}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 10 }} />
      <Text style={{ fontWeight: 'bold' }}>
        {item.title.replace(/[^a-zA-Z0-9]/g, '').replace('FR', '')}
      </Text>
      <View style={{ height: 10 }} />
      <FlatList
        horizontal
        data={item.items}
        renderItem={renderChannel}
        keyExtractor={({ name }) => name}
      />
      <View style={{ height: 40 }} />
    </View>
  );
};

export default ChannelGroup;

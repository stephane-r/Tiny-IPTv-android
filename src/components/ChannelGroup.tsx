import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', paddingLeft: 15, color: 'white' }}>
        {item.title.replace(/[^a-zA-Z0-9]/g, '').replace('FR', '')}
      </Text>
      <View style={{ height: 15 }} />
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

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    backgroundColor: '#1d1d1d',
  },
});

export default ChannelGroup;

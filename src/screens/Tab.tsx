import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useApp } from '../states/app';
import { Channel as ChannelType } from '../types';
import { useFavoris } from '../hooks/useFavoris';
import Channel from '../components/Channel';

const TabScreen: React.FC = () => {
  const app = useApp();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { addOrRemoveFromFavoris, favoris } = useFavoris();

  const renderChannel: React.FC = ({ item }: { item: ChannelType }) => (
    <Channel
      item={item}
      navigation={navigation}
      addOrRemoveFromFavoris={addOrRemoveFromFavoris}
      favoris={favoris}
    />
  );

  const data = app.data[params.category];

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        {data.title} ({data.items.length})
      </Text>
      <FlatList
        numColumns={1}
        data={data.items}
        renderItem={renderChannel}
        keyExtractor={({ name }) => name}
      />
    </View>
  );
};

export default TabScreen;

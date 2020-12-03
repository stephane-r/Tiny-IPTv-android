import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Channel as ChannelType } from '../types';
import ChannelGroup from '../components/ChannelGroup';

const TabScreen: React.FC = () => {
  const { params } = useRoute();

  const renderChannel: React.FC = ({ item }: { item: ChannelType }) => (
    <ChannelGroup item={item} />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={params.data}
        renderItem={renderChannel}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

export default TabScreen;

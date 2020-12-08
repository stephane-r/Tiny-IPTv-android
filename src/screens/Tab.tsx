import { useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import { Channel as ChannelType } from '../types';
import ChannelGroup from '../components/ChannelGroup';
import Layout from '../components/Layout';

const TabScreen: React.FC = () => {
  const { params } = useRoute();

  const renderChannel: React.FC = ({ item }: { item: ChannelType }) => (
    <ChannelGroup item={item} />
  );

  return (
    <Layout title={params.categoryName}>
      <View style={{ height: 30 }} />
      <FlatList
        data={params.data}
        renderItem={renderChannel}
        keyExtractor={(item, index) => String(index)}
      />
    </Layout>
  );
};

export default memo(TabScreen);

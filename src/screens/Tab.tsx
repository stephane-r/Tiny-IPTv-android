import { useRoute } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Channel as ChannelType } from '../types';
import ChannelGroup from '../components/ChannelGroup';
import Layout from '../components/Layout';
import { isTablet } from 'react-native-device-info';
import { useFavoris } from '../hooks/useFavoris';
import Spacer from '../components/Spacer';

const TabScreen: React.FC = () => {
  const { params } = useRoute();
  const { addOrRemoveFromFavoris } = useFavoris();

  useEffect(() => {}, []);

  const renderChannel: React.FC = ({ item }: { item: ChannelType }) => (
    <ChannelGroup
      item={item}
      addOrRemoveFromFavoris={addOrRemoveFromFavoris}
      categoryName={params.categoryName}
    />
  );

  return (
    <Layout title={params.categoryName}>
      <Spacer height={isTablet() ? 30 : 20} />
      <FlatList
        data={params.data}
        renderItem={renderChannel}
        keyExtractor={(item, index) => String(index)}
      />
    </Layout>
  );
};

export default memo(TabScreen);

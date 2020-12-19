import { useNavigation, useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import { Channel as ChannelType } from '../types';
import ChannelGroup from '../components/ChannelGroup';
import Layout from '../components/Layout';
import { isTablet } from 'react-native-device-info';
import { useFavoris } from '../hooks/useFavoris';

const TabScreen: React.FC = () => {
  const { params } = useRoute();
  const { addOrRemoveFromFavoris } = useFavoris();
  const navigation = useNavigation();

  const renderChannel: React.FC = ({ item }: { item: ChannelType }) => (
    <ChannelGroup
      item={item}
      addOrRemoveFromFavoris={addOrRemoveFromFavoris}
      navigation={navigation}
      categoryName={params.categoryName}
    />
  );

  return (
    <Layout title={params.categoryName}>
      <View style={{ height: isTablet() ? 30 : 20 }} />
      <FlatList
        data={params.data}
        renderItem={renderChannel}
        keyExtractor={(item, index) => String(index)}
      />
    </Layout>
  );
};

export default memo(TabScreen);

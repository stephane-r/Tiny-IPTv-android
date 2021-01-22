import { useRoute } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import { Channel as ChannelType } from '../types';
import ChannelGroup from '../components/ChannelGroup';
import Layout from '../components/Layout';
import { isTablet } from 'react-native-device-info';
import { useFavoris } from '../hooks/useFavoris';
import Spacer from '../components/Spacer';

const TabScreen: React.FC = () => {
  const { params } = useRoute();
  // const { addOrRemoveFromFavoris } = useFavoris();

  useEffect(() => {}, []);

  return (
    <Layout title={params.categoryName}>
      <Spacer height={isTablet() ? 30 : 20} />
      {params.data.map((item, index) => (
        <ChannelGroup
          key={index}
          item={item}
          // addOrRemoveFromFavoris={addOrRemoveFromFavoris}
          categoryName={params.categoryName}
        />
      ))}
    </Layout>
  );
};

export default memo(TabScreen);

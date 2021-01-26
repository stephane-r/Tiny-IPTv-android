import { useRoute } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import ChannelGroup from '../components/ChannelGroup';
import Layout from '../components/Layout';

const TabScreen: React.FC = () => {
  const { params } = useRoute();

  useEffect(() => {}, []);

  return (
    <Layout title={params.categoryName}>
      {params.data.map((item, index) => (
        <ChannelGroup
          key={index}
          item={item}
          categoryName={params.categoryName}
        />
      ))}
    </Layout>
  );
};

export default memo(TabScreen);

import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Channel as ChannelType } from '../types';
import ChannelGroup from '../components/ChannelGroup';
import { TAB_BAR_WIDTH } from '../components/TabBar';

const TabScreen: React.FC = () => {
  const { params } = useRoute();

  const renderChannel: React.FC = ({ item }: { item: ChannelType }) => (
    <ChannelGroup item={item} />
  );

  return (
    <View style={styles.body}>
      <View style={{ height: 30 }} />
      <Text style={{ paddingLeft: 30, color: 'white', fontSize: 30 }}>
        {params.categoryName}
      </Text>
      <View style={{ height: 30 }} />
      <FlatList
        data={params.data}
        renderItem={renderChannel}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    paddingLeft: TAB_BAR_WIDTH * 2,
  },
});

export default TabScreen;

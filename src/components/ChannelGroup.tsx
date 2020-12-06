import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useApp } from '../states/app';
import { Channel as ChannelType } from '../types';
import Channel from './Channel';
import Spacer from './Spacer';
import Subheading from './Subheading';

const ChannelGroup: React.FC = ({ item }: { item: ChannelType }) => {
  const app = useApp();

  const renderChannel = (props) => (
    <Channel
      item={props.item}
      isFavoris={app.favoris.ids.includes(props.item.name)}
    />
  );

  return (
    <View>
      <Subheading>
        {item.title.replace(/[^a-zA-Z0-9]/g, '').replace('FR', '')}
      </Subheading>
      <Spacer height={15} />
      <FlatList
        horizontal
        data={item.items}
        renderItem={renderChannel}
        keyExtractor={({ name }) => name}
      />
      <Spacer height={40} />
    </View>
  );
};

export default ChannelGroup;

import React from 'react';
import { View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { FlatList } from 'react-native-gesture-handler';
import { useApp } from '../states/app';
import { Channel as ChannelType } from '../types';
import Channel from './Channel';
import Spacer from './Spacer';
import Subheading from './Subheading';

const ChannelGroup: React.FC = ({
  item,
  addOrRemoveFromFavoris,
  navigation,
}: {
  item: ChannelType;
}) => {
  const app = useApp();

  const renderChannel = (props) => (
    <Channel
      item={props.item}
      isFavoris={app.favoris.ids.includes(props.item.name)}
      addOrRemoveFromFavoris={addOrRemoveFromFavoris}
      navigation={navigation}
    />
  );

  return (
    <View>
      <Subheading>
        {item.title.replace(/[^a-zA-Z0-9]/g, '').replace('FR', '')}
      </Subheading>
      <Spacer height={isTablet() ? 15 : 10} />
      <FlatList
        horizontal
        data={item.items}
        renderItem={renderChannel}
        style={{ paddingLeft: isTablet() ? 0 : 5 }}
        keyExtractor={({ name }) => name}
      />
      <Spacer height={isTablet() ? 40 : 30} />
    </View>
  );
};

export default ChannelGroup;

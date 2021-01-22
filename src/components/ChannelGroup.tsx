import React from 'react';
import { StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { FlatList } from 'react-native-gesture-handler';
import { Channel as ChannelType } from '../types';
import Channel from './Channel';
import Spacer from './Spacer';
import Subheading from './Subheading';

const ChannelGroup: React.FC = ({
  item,
  ...props
}: {
  item: ChannelType;
  categoryName: string;
}) => {
  const renderChannel = (itemProps) => (
    <Channel item={itemProps.item} {...props} />
  );

  return (
    <View>
      <View accessible={false}>
        <Subheading color="white">
          {item.title.replace(/[^a-zA-Z0-9]/g, '').replace('FR', '')}
        </Subheading>
      </View>
      <Spacer height={isTablet() ? 5 : 0} />
      <FlatList
        horizontal
        data={item.items}
        renderItem={renderChannel}
        style={styles.list}
        keyExtractor={({ name }) => name}
        contentContainerStyle={styles.contentContainer}
      />
      <Spacer height={isTablet() ? 20 : 10} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: { paddingLeft: isTablet() ? 0 : 5 },
  contentContainer: {
    paddingVertical: 10,
  },
});

export default ChannelGroup;

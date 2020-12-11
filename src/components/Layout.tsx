import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import Spacer from './Spacer';
import { TAB_BAR_WIDTH } from './TabBar';
import Title from './Title';

const Layout: React.FC = ({ title, rightRender, children }) => (
  <View style={styles.container}>
    <Spacer height={30} />
    <View style={styles.header}>
      <Title>{title}</Title>
      {rightRender && rightRender}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: isTablet() ? TAB_BAR_WIDTH * 1.8 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 60,
  },
});

export default memo(Layout);

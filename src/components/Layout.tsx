import React, { memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
import { isMobile } from '../constants';
import Spacer from './Spacer';
import Title from './Title';

const Layout: React.FC = ({ title, children }) => {
  const PlatformContainerView = Platform.isTV ? ScrollView : View;
  const PlatformChildrenView = Platform.isTV ? View : ScrollView;

  return (
    <PlatformContainerView style={styles.container}>
      <Spacer height={30} />
      <View style={styles.header}>
        <Title>{title}</Title>
      </View>
      <Spacer height={isTablet() ? 30 : 10} />
      <PlatformChildrenView>{children}</PlatformChildrenView>
    </PlatformContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: isMobile ? 0 : isTablet() ? 20 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: isMobile ? 20 : 60,
  },
});

export default memo(Layout);

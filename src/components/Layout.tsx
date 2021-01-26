import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { ScrollView } from 'react-native-gesture-handler';
import { isMobile } from '../constants';
import Spacer from './Spacer';
import Title from './Title';

const Layout: React.FC = ({ title, children }) => (
  <View style={styles.container}>
    <Spacer height={30} />
    <View style={styles.header}>
      <Title>{title}</Title>
    </View>
    <Spacer height={isTablet() ? 30 : 10} />
    <ScrollView>{children}</ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: isMobile ? 0 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: isMobile ? 20 : 60,
  },
});

export default memo(Layout);

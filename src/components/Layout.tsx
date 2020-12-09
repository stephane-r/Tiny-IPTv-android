import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import Spacer from './Spacer';
import { TAB_BAR_WIDTH } from './TabBar';
import Title from './Title';

const GRADIENT_COLORS = ['#1d1d1d', '#5a5a5a'];

const Layout: React.FC = ({ title, rightRender, children }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.container}
    colors={GRADIENT_COLORS}>
    <Spacer height={30} />
    <View style={styles.header}>
      <Title>{title}</Title>
      {rightRender && rightRender}
    </View>
    {children}
  </LinearGradient>
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

import React from 'react';
import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { Title as PaperTitle } from 'react-native-paper';

const Title = ({ children }) => (
  <PaperTitle style={styles.title}>{children}</PaperTitle>
);

const styles = StyleSheet.create({
  title: {
    lineHeight: isTablet() ? 45 : 30,
    fontSize: isTablet() ? 45 : 30,
    paddingLeft: 15,
    color: 'white',
    textTransform: 'uppercase',
    paddingTop: isTablet() ? 10 : 0,
  },
});

export default Title;

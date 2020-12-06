import React from 'react';
import { StyleSheet } from 'react-native';
import { Title as PaperTitle } from 'react-native-paper';

const Title = ({ children }) => (
  <PaperTitle style={styles.title}>{children}</PaperTitle>
);

const styles = StyleSheet.create({
  title: {
    lineHeight: 45,
    fontSize: 45,
    paddingLeft: 15,
    color: 'white',
    textTransform: 'uppercase',
    paddingTop: 10,
  },
});

export default Title;

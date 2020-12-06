import React from 'react';
import { StyleSheet } from 'react-native';
import { Subheading as PaperSubheading } from 'react-native-paper';

const Subheading = ({ color = 'white', children }) => (
  <PaperSubheading style={[styles.subheading, { color }]}>
    {children}
  </PaperSubheading>
);

const styles = StyleSheet.create({
  subheading: {
    fontWeight: 'bold',
    paddingLeft: 15,
  },
});

export default Subheading;

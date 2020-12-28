import React from 'react';
import { StyleSheet } from 'react-native';
import { Subheading as PaperSubheading, useTheme } from 'react-native-paper';

const Subheading = ({ color, children }) => {
  const { colors } = useTheme();

  return (
    <PaperSubheading
      style={[styles.subheading, { color: color ?? colors.text }]}>
      {children}
    </PaperSubheading>
  );
};

const styles = StyleSheet.create({
  subheading: {
    fontWeight: 'bold',
    paddingLeft: 15,
  },
});

export default Subheading;

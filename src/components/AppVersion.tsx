import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { version } from '../../package';

interface Props {
  color: 'black' | 'white';
}

const AppVersion = ({ color }: Props) => {
  const { colors } = useTheme();

  return <Text style={{ color: color ?? colors.text }}>{version}</Text>;
};

export default AppVersion;

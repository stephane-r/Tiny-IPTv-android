import React from 'react';
import { Text } from 'react-native-paper';
import { version } from '../../package';

interface Props {
  color: 'black' | 'white';
}

const AppVersion = ({ color = 'white' }: Props) => (
  <Text style={{ color }}>{version}</Text>
);

export default AppVersion;

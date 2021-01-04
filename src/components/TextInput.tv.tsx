/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableNativeFeedback, StyleSheet, View } from 'react-native';
import Spacer from '../components/Spacer';
import { Text, useTheme } from 'react-native-paper';

interface Props {
  label: string;
  value: string;
  onPress: () => void;
  isActive: boolean;
}

const TextInputTv = ({ label, value, onPress, isActive }: Props) => {
  const { colors } = useTheme();

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Spacer height={5} />
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={[
            styles.input,
            isActive
              ? {
                  backgroundColor: 'rgba(0, 0, 0, .1)',
                  borderColor: colors.primary,
                }
              : {},
          ]}>
          <Text>{value}</Text>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 3,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
  },
});

export default TextInputTv;

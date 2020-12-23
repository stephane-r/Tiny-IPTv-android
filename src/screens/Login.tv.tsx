import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useAuth from '../hooks/useAuth';
import { LoginFormData } from '../types';
import InlineKeyboard from 'react-native-inline-keyboard';
import AppVersion from '../components/AppVersion';
import Spacer from '../components/Spacer';
import { Button } from 'react-native-paper';

const LoginTvScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    server: '',
  });
  const { submitFormData, loading } = useAuth();
  const [activeFieldName, setActiveFieldName] = useState<null | string>(null);

  const onChangeText = (value: string): void =>
    setFormData({
      ...formData,
      [activeFieldName]: value,
    });

  const onPress = (): void => submitFormData(formData);

  return (
    <>
      <View style={styles.body}>
        <Button mode="outlined" onPress={() => setActiveFieldName('username')}>
          {formData.username ? formData.username : 'Username'}
        </Button>
        <Spacer height={15} />
        <Button mode="outlined" onPress={() => setActiveFieldName('password')}>
          {formData.password ? formData.password : 'Password'}
        </Button>
        <Spacer height={15} />
        <Button mode="outlined" onPress={() => setActiveFieldName('server')}>
          {formData.server ? formData.server : 'Server'}
        </Button>
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
      <View style={styles.appVersion}>
        <AppVersion color="black" />
        <Spacer height={20} />
      </View>
      <InlineKeyboard
        value={formData[activeFieldName]}
        onChange={(letter) => onChangeText(letter)}
        letterButtonFocusStyles={styles.letterButtonFocus}
        letterContainerStyles={styles.letterContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  appVersion: {
    width: '100%',
    alignItems: 'center',
  },
  letterContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  letterButtonFocus: {
    backgroundColor: 'red',
  },
});

export default LoginTvScreen;

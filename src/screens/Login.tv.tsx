import React, { useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import useAuth from '../hooks/useAuth';
import { LoginFormData } from '../types';
import InlineKeyboard from 'react-native-inline-keyboard';
import AppVersion from '../components/AppVersion';
import Spacer from '../components/Spacer';
import { Button, useTheme } from 'react-native-paper';
import { inlineKeyboardLanguage } from '../constants';
import TextInputTv from '../components/TextInput.tv';
import { DEV_USERNAME, DEV_PASSWORD, DEV_SERVER } from '@env';

const LoginTvScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: __DEV__ ? DEV_USERNAME : '',
    password: __DEV__ ? DEV_PASSWORD : '',
    server: __DEV__ ? DEV_SERVER : 'http://',
  });
  const { submitFormData, loading } = useAuth();
  const [activeFieldName, setActiveFieldName] = useState<null | string>(null);
  const { colors } = useTheme();

  const onChangeText = (value: string): void =>
    setFormData({
      ...formData,
      [activeFieldName]: value,
    });

  const onPress = (): void => submitFormData(formData);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.body}>
          <TextInputTv
            label="Username"
            value={formData.username}
            onPress={() => setActiveFieldName('username')}
            isActive={activeFieldName === 'username'}
          />
          <Spacer height={15} />
          <TextInputTv
            label="Password"
            value={formData.password}
            onPress={() => setActiveFieldName('password')}
            isActive={activeFieldName === 'password'}
          />
          <Spacer height={15} />
          <TextInputTv
            label="Server"
            value={formData.server}
            onPress={() => setActiveFieldName('server')}
            isActive={activeFieldName === 'server'}
          />
          <Spacer height={20} />
          <Button mode="contained" loading={loading} onPress={onPress}>
            Submit
          </Button>
          <Spacer height={15} />
          <View style={styles.appVersion}>
            <AppVersion />
          </View>
        </View>
      </View>
      <View style={[styles.keyboard, { backgroundColor: colors.backdrop }]}>
        <InlineKeyboard
          value={formData[activeFieldName]}
          onChange={(letter) => onChangeText(letter)}
          letterContainerStyles={styles.letterContainer}
          letterButtonFocusStyles={styles.letterButtonFocus}
          letterButtonStyles={styles.letterButtonStyles}
          language={inlineKeyboardLanguage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 3,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  appVersion: {
    width: '100%',
    alignItems: 'center',
  },
  keyboard: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    paddingVertical: 15,
  },
  letterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    paddingVertical: 5,
  },
  letterButtonFocus: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  letterButtonStyles: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
});

export default LoginTvScreen;

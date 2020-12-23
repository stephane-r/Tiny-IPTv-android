import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Spacer from '../components/Spacer';
import Subheading from '../components/Subheading';
import AppVersion from '../components/AppVersion';
import useAuth from '../hooks/useAuth';
import { LoginFormData } from '../types';
import { DEV_PLAYLIST_ID } from '@env';

type ACCOUNT_TYPE = 'account';
type M3U_FILE_TYPE = 'm3u-file';
type PLAYLIST_ID_TYPE = 'playlist-id';

const ACCOUNT = 'account';
const M3U_FILE = 'm3u-file';
const PLAYLIST_ID = 'playlist-id';

const LoginAndroidScreen: React.FC = () => {
  const [loginType, setLoginType] = useState<
    ACCOUNT_TYPE | M3U_FILE_TYPE | PLAYLIST_ID_TYPE
  >('account');

  const isAccountLoginType = loginType === ACCOUNT;
  const isM3uFileLoginType = loginType === M3U_FILE;
  const isPlaylistIdLoginType = loginType === PLAYLIST_ID;

  const buttonMode = (isActive: boolean): string =>
    isActive ? 'contained' : 'text';

  return (
    <>
      <View style={styles.body}>
        <View style={styles.tabs}>
          <Button
            mode={buttonMode(isAccountLoginType)}
            style={styles.buttonNav}
            onPress={() => setLoginType(ACCOUNT)}>
            Account
          </Button>
          <Button
            mode={buttonMode(isM3uFileLoginType)}
            style={styles.buttonNav}
            onPress={() => setLoginType(M3U_FILE)}>
            M3U file
          </Button>
          <Button
            mode={buttonMode(isPlaylistIdLoginType)}
            style={styles.buttonNav}
            onPress={() => setLoginType(PLAYLIST_ID)}>
            Playlist ID
          </Button>
        </View>
        {isAccountLoginType && <AcountLogin />}
        {isM3uFileLoginType && <M3uFileLogin />}
        {isPlaylistIdLoginType && <PlaylistIdLogin />}
      </View>
      <View style={styles.appVersion}>
        <AppVersion color="black" />
        <Spacer height={20} />
      </View>
    </>
  );
};

const AcountLogin = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    server: '',
  });
  const { submitFormData, loading } = useAuth();

  const onChangeText = (key: string, value: string): void =>
    setFormData({
      ...formData,
      [key]: value,
    });

  const onPress = (): void => submitFormData(formData);

  return (
    <>
      <Spacer height={40} />
      <Subheading color="black">Account</Subheading>
      <View style={styles.form}>
        <Spacer height={10} />
        <TextInput
          mode="outlined"
          label="Username"
          onChangeText={(username) => onChangeText('username', username)}
        />
        <Spacer height={15} />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(password) => onChangeText('password', password)}
        />
        <Spacer height={15} />
        <TextInput
          mode="outlined"
          label="Server"
          onChangeText={(server) => onChangeText('server', server)}
        />
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
    </>
  );
};

const M3uFileLogin = () => {
  const [url, setUrl] = useState<null | string>(null);
  const { login, loading } = useAuth();

  const onPress = (): void => login(url);

  return (
    <>
      <Spacer height={40} />
      <Subheading color="black">Account</Subheading>
      <View style={styles.form}>
        <Spacer height={15} />
        <TextInput mode="outlined" label="url" onChangeText={setUrl} />
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
    </>
  );
};

const PlaylistIdLogin = () => {
  const [playlistId, setPlaylistId] = useState(
    process.env.NODE_ENV !== 'production' ? DEV_PLAYLIST_ID : null,
  );
  const { loginWithPlaylistId, loading } = useAuth();

  const onPress = (): void => loginWithPlaylistId(playlistId);

  return (
    <>
      <Spacer height={40} />
      <Subheading color="black">Playlist ID</Subheading>
      <View style={styles.form}>
        <Spacer height={15} />
        <TextInput
          mode="outlined"
          label="Playlist ID"
          value={playlistId}
          onChangeText={setPlaylistId}
        />
        <Spacer height={15} />
        <Button mode="contained" loading={loading} onPress={onPress}>
          Submit
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  tabs: { flexDirection: 'row', justifyContent: 'center' },
  buttonNav: {
    marginHorizontal: 10,
  },
  form: {
    paddingHorizontal: 15,
  },
  appVersion: {
    width: '100%',
    alignItems: 'center',
  },
});

export default LoginAndroidScreen;

import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAsyncStorage } from 'use-async-storage';
import { getPlaylist } from '../api';
import { Playlist } from '../enums/Playlist';
import { Screen } from '../enums/Screen';
import { receiveData } from '../states/app';
import { LoginFormData } from '../types';

const generateLoginUrl = ({ server, username, password }: LoginFormData) =>
  `${server}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;

const LoginScreen = ({ navigation }) => {
  const [, setPlaylistId] = useAsyncStorage<string | null>(Playlist.id, null);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    server: '',
  });
  const [url, setUrl] = useState<null | string>(null);
  const [id, setId] = useState<null | string>(null);

  const submitUrl = async (serverUrl: string = url): Promise<void> => {
    if (serverUrl === null || serverUrl === '') {
      return alert('Nop nop');
    }

    try {
      // TODO: maybe try to change API from POST to GET for remove headers, body and method ? Just request more simply ?
      const request = await fetch('http://192.168.122.1:1500/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          url: serverUrl,
        }),
      });
      const response = await request.json();
      setPlaylistId(response.playlistId);

      return navigation.navigate(Screen.Home);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeText = (key: string, value: string): void =>
    setFormData({
      ...formData,
      [key]: value,
    });

  const submitFormData = (): void => submitUrl(generateLoginUrl(formData));

  const loginWithPlaylistId = async () => {
    const data = await getPlaylist(id);
    receiveData(data);
    await setPlaylistId(id);

    return navigation.navigate(Screen.Home);
  };

  return (
    <View style={styles.body}>
      <View style={{ width: '100%' }}>
        <Text>Account</Text>
        <View style={{ height: 15 }} />
        <TextInput
          style={{ borderWidth: 1 }}
          placeholder="Username"
          onChangeText={(username) => onChangeText('username', username)}
        />
        <View style={{ height: 15 }} />
        <TextInput
          style={{ borderWidth: 1 }}
          placeholder="Password"
          onChangeText={(password) => onChangeText('password', password)}
        />
        <View style={{ height: 15 }} />
        <TextInput
          style={{ borderWidth: 1 }}
          placeholder="Server"
          onChangeText={(server) => onChangeText('server', server)}
        />
        <View style={{ height: 15 }} />
        <Button title="Submit" onPress={submitFormData} />
        <View style={{ height: 15 }} />
        <Text>Or</Text>
        <View style={{ height: 15 }} />
        <Text>URL M3U file</Text>
        <View style={{ height: 15 }} />
        <TextInput
          style={{ borderWidth: 1 }}
          placeholder="url"
          onChangeText={setUrl}
        />
        <View style={{ height: 15 }} />
        <Button title="Submit" onPress={submitUrl} />
        <View style={{ height: 15 }} />
        <Text>Or</Text>
        <View style={{ height: 15 }} />
        <Text>Playlist ID</Text>
        <View style={{ height: 15 }} />
        <TextInput
          style={{ borderWidth: 1 }}
          placeholder="Playlist ID"
          onChangeText={setId}
        />
        <View style={{ height: 15 }} />
        <Button title="Submit" onPress={loginWithPlaylistId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;

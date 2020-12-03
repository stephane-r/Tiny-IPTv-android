import React, { useState } from 'react';
import {
  ScrollView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { LoginFormData } from '../types';

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    server: '',
  });
  const [url, setUrl] = useState<null | string>(null);
  const [id, setId] = useState<null | string>(null);
  const { login, loginWithPlaylistId, submitFormData } = useAuth();

  const onChangeText = (key: string, value: string): void =>
    setFormData({
      ...formData,
      [key]: value,
    });

  return (
    <ScrollView>
      <View
        style={{
          minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
        }}>
        <View style={styles.body}>
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
          <Button title="Submit" onPress={() => submitFormData(formData)} />
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
          <Button title="Submit" onPress={() => login(url)} />
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
          <Button title="Submit" onPress={() => loginWithPlaylistId(id)} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default LoginScreen;

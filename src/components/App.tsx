import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAsyncStorage} from 'use-async-storage';
import Playlist from './Playlist';

const App = () => {
  const [value, setValue] = useAsyncStorage<string>('fileId', '');
  const [url, setUrl] = useState<null | string>(null);

  const submit = async () => {
    try {
      const request = await fetch('http://192.168.122.1:3000/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      });
      const result = await request.json();

      setValue(result.fileId);
    } catch (error) {
      console.log(error);
    }
  };

  if (value) {
    return (
      <View style={styles.body}>
        <Playlist fileId={value} clearFileId={() => setValue(null)} />
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <View style={{width: '100%'}}>
        <Text>URL M3U file</Text>
        <View style={{height: 15}} />
        <TextInput style={{borderWidth: 1}} onChangeText={setUrl} />
        <View style={{height: 15}} />
        <Button title="Submit" onPress={submit} />
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

export default App;

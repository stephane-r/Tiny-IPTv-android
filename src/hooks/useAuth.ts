import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from 'use-async-storage';
import { getAndReceivePlaylist } from '../api';
import { Playlist } from '../enums/Playlist';
import { Screen } from '../enums/Screen';
import { resetState } from '../states/app';
import { LoginFormData } from '../types';
import generateLoginUrl from '../utils/generateLoginUrl';

interface UseAuthProps {
  login: (url: string) => Promise<void>;
  loginWithPlaylistId: (url: string) => Promise<void>;
  submitFormData: (formData: LoginFormData) => void;
}

const useAuth = (): UseAuthProps => {
  const [, setPlaylistId] = useAsyncStorage<string | null>(Playlist.id, null);
  const navigation = useNavigation();

  const login = async (serverUrl: string): Promise<void> => {
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
      await setPlaylistId(response.playlistId);
      await getAndReceivePlaylist(response.playlistId);

      return navigation.navigate(Screen.Home);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithPlaylistId = async (id: string): Promise<void> => {
    await getAndReceivePlaylist(id);
    await setPlaylistId(id);

    return navigation.navigate(Screen.Home);
  };

  const submitFormData = (formData: LoginFormData): void => {
    const url = generateLoginUrl(formData);
    return login(url);
  };

  const logout = (): Promise<void> => {
    resetState();
    setPlaylistId(null);
    navigation.navigate(Screen.Login);
  };

  return {
    login,
    loginWithPlaylistId,
    submitFormData,
    logout,
  };
};

export default useAuth;

import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from 'use-async-storage';
import { API_URL } from '@env';
import { getAndReceivePlaylist } from '../api';
import { Playlist } from '../enums/Playlist';
import { Screen } from '../enums/Screen';
import { resetState, showSnakbar } from '../states/app';
import { LoginFormData } from '../types';
import generateLoginUrl from '../utils/generateLoginUrl';
import { useState } from 'react';

interface UseAuthProps {
  login: (url: string) => Promise<void>;
  loginWithPlaylistId: (url: string) => Promise<void>;
  submitFormData: (formData: LoginFormData) => void;
  loading: boolean;
}

const useAuth = (): UseAuthProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setPlaylistId] = useAsyncStorage<string | null>(Playlist.id, null);
  const [, setFileUrl] = useAsyncStorage<null | string>('fileUrl', null);
  const navigation = useNavigation();

  const login = async (serverUrl: string): Promise<void> => {
    if (serverUrl === null || serverUrl === '') {
      return showSnakbar({
        message: `You can't submit empty field`,
      });
    }

    alert(`${API_URL}/playlist`);

    setLoading(true);

    try {
      // TODO: maybe try to change API from POST to GET for remove headers, body and method ? Just request more simply ?
      const request = await fetch(`${API_URL}/playlist`, {
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
      await setFileUrl(serverUrl);

      return navigation.navigate(Screen.Home);
    } catch (error) {
      showSnakbar({
        message: 'Can not login with this url',
      });
    } finally {
      setLoading(false);
    }
  };

  const submitFormData = (formData: LoginFormData): void => {
    const formIsValid = Object.entries(formData).every(
      ([, value]) => value !== '',
    );

    if (!formIsValid) {
      return showSnakbar({
        message: 'You can not submit empty fields',
      });
    }

    const url = generateLoginUrl(formData);
    return login(url);
  };

  const loginWithPlaylistId = async (id: string): Promise<void> => {
    setLoading(true);

    try {
      await getAndReceivePlaylist(id);
      await setPlaylistId(id);

      return navigation.navigate(Screen.Home);
    } catch (error) {
      showSnakbar({
        message: `Can not login with ${id}`,
      });
    } finally {
      setLoading(false);
    }
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
    loading,
  };
};

export default useAuth;

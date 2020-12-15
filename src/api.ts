import { API_URL } from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import { receiveData, setHiddenCategories } from './states/app';
import { Playlist } from './types';

const routes = {
  getPlaylist: (playlistId: string, country: string = 'fr') =>
    `playlist?playlistId=${playlistId}&country=${country}`,
};

const fetchPlaylist = (playlistId: string): Promise<Playlist> =>
  fetch(`${API_URL}/${routes.getPlaylist(playlistId, 'fr')}`).then((result) =>
    result.json(),
  );

const getAndReceivePlaylist = async (playlistId: string): Promise<Playlist> => {
  const data: Playlist = await fetchPlaylist(playlistId);
  const hiddenCategories = await AsyncStorage.getItem('hiddenCategories');
  setHiddenCategories(
    data.categories.filter((c) => !hiddenCategories?.includes(c)),
  );
  return receiveData(data);
};

export { routes, fetchPlaylist, getAndReceivePlaylist };

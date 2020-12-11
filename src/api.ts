import { API_URL } from '@env';
import { receiveData } from './states/app';
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
  return receiveData(data);
};

export { routes, fetchPlaylist, getAndReceivePlaylist };

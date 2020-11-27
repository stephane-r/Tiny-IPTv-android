import { API_URL } from '@env';
import { Playlist } from './types';

const routes = {
  getPlaylist: (playlistId: string, country: string = 'fr') =>
    `playlist?playlistId=${playlistId}&country=${country}`,
};

const getPlaylist = (playlistId: string): Promise<Playlist> =>
  fetch(`${API_URL}/${routes.getPlaylist(playlistId, 'fr')}`)
    .then((result) => result.json())
    .catch(console.log);

export { routes, getPlaylist };

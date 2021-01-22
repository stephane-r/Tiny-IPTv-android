import { useAsyncStorage } from 'use-async-storage';
import { Playlist } from '../enums/Playlist';
import { Channel } from '../types';
import { setFavoris as setFavorisState } from '../states/favoris';
import { showSnakbar } from '../states/snackbar';

interface UseFavorisHook {
  addOrRemoveFromFavoris: (channel: Channel) => void;
  clearFavoris: () => void;
}

const useFavoris = (): UseFavorisHook => {
  const [favoris, setFavoris] = useAsyncStorage<string[]>(Playlist.Favoris, []);
  const [favorisIds, setFavorisIds] = useAsyncStorage<Channel[]>(
    Playlist.FavorisIds,
    [],
  );

  const addOrRemoveFromFavoris = async (channel: Channel): void => {
    let favorisUpdated = [];
    let favorisIdsUpdated = [];
    let snackbarMessage = '';

    if (favorisIds.includes(channel.name)) {
      favorisUpdated = favoris.filter((f) => f.name !== channel.name);
      favorisIdsUpdated = favorisIds.filter((id) => id !== channel.name);
      snackbarMessage = `${channel.name} has been removed from your favoris`;
    } else {
      favorisUpdated = [...favoris, channel];
      favorisIdsUpdated = [...favorisIds, channel.name];
      snackbarMessage = `${channel.name} has been added on your favoris`;
    }

    setFavoris(favorisUpdated);
    setFavorisIds(favorisIdsUpdated);

    await setFavorisState({
      data: favorisUpdated,
      ids: favorisIdsUpdated,
    });

    showSnakbar({
      message: snackbarMessage,
    });
  };

  const clearFavoris = (): void => {
    setFavoris([]);
    setFavorisIds([]);

    return setFavorisState({
      data: [],
      ids: [],
    });
  };

  return {
    favoris,
    favorisIds,
    addOrRemoveFromFavoris,
    clearFavoris,
  };
};

export { useFavoris };

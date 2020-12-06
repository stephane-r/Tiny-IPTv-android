import { useAsyncStorage } from 'use-async-storage';
import { Playlist } from '../enums/Playlist';
import { Channel } from '../types';
import { setFavoris as setFavorisState } from '../states/app';

interface UseFavorisHook {
  favoris: Channel[];
  favorisIds: string[];
  addOrRemoveFromFavoris: (channel: Channel) => void;
  clearFavoris: () => void;
}

const useFavoris = (): UseFavorisHook => {
  const [favoris, setFavoris] = useAsyncStorage<string[]>(Playlist.Favoris, []);
  const [favorisIds, setFavorisIds] = useAsyncStorage<Channel[]>(
    Playlist.FavorisIds,
    [],
  );

  const addOrRemoveFromFavoris = (channel: Channel): void => {
    let favorisUpdated = [];
    let favorisIdsUpdated = [];

    if (favorisIds.includes(channel.name)) {
      favorisUpdated = favoris.filter((f) => f.name !== channel.name);
      favorisIdsUpdated = favorisIds.filter((id) => id !== channel.name);
    } else {
      favorisUpdated = [...favoris, channel];
      favorisIdsUpdated = [...favorisIds, channel.name];
    }

    setFavoris(favorisUpdated);
    setFavorisIds(favorisIdsUpdated);

    return setFavorisState({
      data: favorisUpdated,
      ids: favorisIdsUpdated,
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

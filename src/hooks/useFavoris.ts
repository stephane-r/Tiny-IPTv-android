import { useAsyncStorage } from 'use-async-storage';
import { Playlist } from '../enums/Playlist';
import { Channel } from '../types';

interface UseFavorisHook {
  favoris: Channel[];
  favorisIds: string[];
  addOrRemoveFromFavoris: (name: string) => void;
  clearFavoris: () => void;
}

const useFavoris = (): UseFavorisHook => {
  const [favoris, setFavoris] = useAsyncStorage<string[]>(Playlist.Favoris, []);
  const [favorisIds, setFavorisIds] = useAsyncStorage<Channel[]>(
    Playlist.FavorisIds,
    [],
  );

  const addOrRemoveFromFavoris = (channel: Channel): void => {
    if (favorisIds.includes(channel.name)) {
      const favorisUpdated = favoris.filter((f) => f.name !== channel.name);
      const favorisIdsUpdated = favorisIds.filter((id) => id !== channel.name);

      setFavoris(favorisUpdated);
      return setFavorisIds(favorisIdsUpdated);
    }

    setFavoris([...favoris, channel]);
    return setFavorisIds([...favorisIds, channel.name]);
  };

  const clearFavoris = (): void => {
    setFavoris([]);
    setFavorisIds([]);
  };

  return {
    favoris,
    favorisIds,
    addOrRemoveFromFavoris,
    clearFavoris,
  };
};

export { useFavoris };

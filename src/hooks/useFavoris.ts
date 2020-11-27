import { useAsyncStorage } from 'use-async-storage';
import { Playlist } from '../enums/Playlist';

interface UseFavorisHook {
  addOrRemoveFromFavoris: (name: string) => void;
  favoris: string[];
}

const useFavoris = (): UseFavorisHook => {
  const [favoris, setFavoris] = useAsyncStorage<string[]>(Playlist.Favoris, []);

  const addOrRemoveFromFavoris = (name: string): void => {
    if (favoris.includes(name)) {
      const favorisUpdated = favoris.filter((f) => f !== name);
      return setFavoris(favorisUpdated);
    }

    return setFavoris([...favoris, name]);
  };

  return {
    addOrRemoveFromFavoris,
    favoris,
  };
};

export { useFavoris };

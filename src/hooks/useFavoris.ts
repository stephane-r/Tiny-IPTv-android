import { useAsyncStorage } from 'use-async-storage';
import { Playlist } from '../enums/Playlist';
import { Channel } from '../types';
import {
  AppState,
  setFavoris as setFavorisState,
  showSnakbar,
  useApp,
} from '../states/app';
import { useEffect } from 'react';

interface UseFavorisHook {
  addOrRemoveFromFavoris: (channel: Channel) => void;
  clearFavoris: () => void;
}

const useFavoris = (): UseFavorisHook => {
  const app: AppState = useApp();
  const favoris = app.favoris.data;
  const favorisIds = app.favoris.ids;
  const [, setFavoris] = useAsyncStorage<string[]>(Playlist.Favoris, []);
  const [, setFavorisIds] = useAsyncStorage<Channel[]>(Playlist.FavorisIds, []);

  useEffect(() => {}, []);

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
      snackbarMessage = `${channel.name} has been added to your favoris`;
    }

    setFavoris(favorisUpdated);
    setFavorisIds(favorisIdsUpdated);

    setFavorisState({
      data: favorisUpdated,
      ids: favorisIdsUpdated,
    });

    return showSnakbar({
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
    addOrRemoveFromFavoris,
    clearFavoris,
  };
};

export { useFavoris };

import { createState, createHook } from '@zoontek/react-global-state';
import { FavorisState, Playlist } from '../types';

export interface FavorisState extends Playlist {
  favoris: FavorisState;
}

const initialAppState: FavorisState = {
  favoris: {
    ids: [],
    data: [],
  },
};

const defaultState: FavorisState = createState(initialAppState);

const { setState, resetState } = defaultState;

export { resetState };
export const useFavorisState = createHook(defaultState);
export const setFavoris = (favoris: FavorisState) =>
  setState((state: FavorisState) => ({
    ...state,
    favoris,
  }));

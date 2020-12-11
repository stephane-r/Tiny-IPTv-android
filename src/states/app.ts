import { createState, createHook } from '@zoontek/react-global-state';
import { Channel, Playlist } from '../types';

interface FavorisState {
  ids: string[];
  data: Channel[];
}

export interface AppState extends Playlist {
  favoris: FavorisState;
}

const initialAppState: AppState = {
  categories: null,
  data: {},
  favoris: {
    ids: [],
    data: [],
  },
};

const app: AppState = createState(initialAppState);

const { setState, resetState } = app;

export { resetState };
export const useApp = createHook(app);
export const receiveData = (data: Playlist) =>
  setState((state: AppState) => ({
    ...state,
    ...data,
  }));
export const setFavoris = (favoris: FavorisState) =>
  setState((state: AppState) => ({
    ...state,
    favoris,
  }));

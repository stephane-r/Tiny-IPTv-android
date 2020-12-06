import { createState, createHook } from '@zoontek/react-global-state';
import { Channel, Playlist } from '../types';

interface FavorisState {
  ids: string[];
  data: Channel[];
}

export interface AppState extends Playlist {
  favoris: FavorisState;
  dialog: {
    favoris: {
      isOpen: boolean;
      data: null;
    };
  };
}

const initialAppState: AppState = {
  categories: null,
  data: {},
  favoris: {
    ids: [],
    data: [],
  },
  dialog: {
    favoris: {
      isOpen: false,
      data: null,
    },
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
export const toggleDialogFavoris = (
  isOpen: boolean = initialAppState.dialog.favoris.isOpen,
  data: Channel = initialAppState.dialog.favoris.data,
) =>
  setState((state: AppState) => ({
    ...state,
    dialog: {
      ...state.dialog,
      favoris: {
        isOpen,
        data,
      },
    },
  }));
export const setFavoris = (favoris: FavorisState) =>
  setState((state: AppState) => ({
    ...state,
    favoris,
  }));

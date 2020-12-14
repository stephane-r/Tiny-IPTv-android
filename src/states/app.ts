import { createState, createHook } from '@zoontek/react-global-state';
import { FavorisState, Playlist, Snackbar } from '../types';

export interface AppState extends Playlist {
  favoris: FavorisState;
  snackbar: Snackbar;
}

const initialAppState: AppState = {
  categories: null,
  data: {},
  favoris: {
    ids: [],
    data: [],
  },
  snackbar: {
    visible: false,
    message: '',
    action: {
      label: 'Close',
      onPress: closeSnackbar,
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
export const setFavoris = (favoris: FavorisState) =>
  setState((state: AppState) => ({
    ...state,
    favoris,
  }));
export const showSnakbar = ({
  message,
  action = initialAppState.snackbar.action,
}: {
  message: string;
  action: { label: string; onPress: () => void };
}) =>
  setState((state: AppState) => ({
    ...state,
    snackbar: {
      ...state.snackbar,
      visible: true,
      message,
      action,
    },
  }));
export const closeSnackbar = () =>
  setState((state: AppState) => ({
    ...state,
    snackbar: {
      ...state.snackbar,
      visible: false,
    },
  }));

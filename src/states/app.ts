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
    buttonLabelClose: '',
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
  buttonLabelClose = 'Close',
}: {
  message: string;
  buttonLabelClose?: string;
}) =>
  setState((state: AppState) => ({
    ...state,
    snackbar: {
      ...state.snackbar,
      visible: true,
      message,
      buttonLabelClose,
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

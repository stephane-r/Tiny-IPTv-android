import { createState, createHook } from '@zoontek/react-global-state';
import { FavorisState, Playlist, Snackbar } from '../types';

export interface AppState extends Playlist {
  favoris: FavorisState;
  snackbar: Snackbar;
  source: null | string;
}

export const closeSnackbar = () =>
  setState((state: AppState) => ({
    ...state,
    snackbar: {
      ...state.snackbar,
      visible: false,
    },
  }));

const initialAppState: AppState = {
  categories: null,
  categoriesFiltered: null,
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
  source: null,
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
export const setHiddenCategories = (categories: string[]) =>
  setState((state: AppState) => ({
    ...state,
    categoriesFiltered: categories,
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

export const setSource = (source: string) =>
  setState((state: AppState) => ({
    ...state,
    source,
  }));

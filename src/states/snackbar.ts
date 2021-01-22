import { createState, createHook } from '@zoontek/react-global-state';
import { Playlist, Snackbar } from '../types';

export interface AppState extends Playlist {
  snackbar: Snackbar;
}

export const closeSnackbar = () =>
  setState((state: AppState) => ({
    ...state,
    visible: false,
  }));

const initialSnakbarState: AppState = {
  visible: false,
  message: '',
  action: {
    label: 'Close',
    onPress: closeSnackbar,
  },
};

const initialState: AppState = createState(initialSnakbarState);

const { setState, resetState } = initialState;

export { resetState };
export const useSnackbarState = createHook(initialState);
export const showSnakbar = ({
  message,
  action = initialSnakbarState.action,
}: {
  message: string;
  action: { label: string; onPress: () => void };
}) =>
  setState((state: AppState) => ({
    ...state,
    visible: true,
    message,
    action,
  }));

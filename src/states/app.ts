import { createState, createHook } from '@zoontek/react-global-state';
import { Playlist } from '../types';

const initialAppState: Playlist = {
  categories: null,
  data: {},
};

const app = createState(initialAppState);

const { setState, resetState } = app;

export { resetState };
export const useApp = createHook(app);
export const receiveData = (data: Playlist) => setState(() => data);

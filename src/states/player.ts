import { createState, createHook } from '@zoontek/react-global-state';
import { Platform } from 'react-native';
import { Playlist } from '../types';

export interface PlayerState extends Playlist {
  source: {
    uri: null | string;
    visible: boolean;
    fullscreen: boolean;
  };
}

const initialPlayerState: PlayerState = {
  player: {
    uri: null,
    visible: false,
    fullscreen: Platform.isTV,
  },
};

const initialState: PlayerState = createState(initialPlayerState);

const { setState, resetState } = initialState;

export { resetState };
export const usePlayerState = createHook(initialState);
export const setSource = (source: { uri: null | string; visible: boolean }) =>
  setState((state: PlayerState) => ({
    ...state,
    player: {
      ...state.player,
      ...source,
    },
  }));
export const setFullscreen = (fullscreen: boolean) =>
  setState((state: PlayerState) => ({
    ...state,
    player: {
      ...state.player,
      fullscreen,
    },
  }));

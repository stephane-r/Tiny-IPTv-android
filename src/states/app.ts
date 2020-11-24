import {createState, createHook} from '@zoontek/react-global-state';

const app = createState({
  fileId: null,
});

const {addListener, getState, setState, resetState} = app;

export const useApp = createHook(app);

export const setFileId = (fileId) =>
  setState((prevState) => ({...prevState, fileId}));

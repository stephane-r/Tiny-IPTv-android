import { createState, createHook } from '@zoontek/react-global-state';

const app = createState({
  categories: null,
  data: {},
});

const { setState } = app;

export const useApp = createHook(app);

export const receiveData = (data) => setState(() => data);

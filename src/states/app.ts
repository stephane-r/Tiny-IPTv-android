import { createState, createHook } from '@zoontek/react-global-state';
import { AppState } from '../types';

const initialAppState: AppState = {
  categories: null,
  categoriesFiltered: null,
  data: {},
};

const app: AppState = createState(initialAppState);

const { setState, resetState } = app;

export { resetState };
export const useApp = createHook(app);
export const receiveData = (data: AppState) =>
  setState((state: AppState) => ({
    ...state,
    ...data,
  }));
export const setHiddenCategories = (categories: string[]) =>
  setState((state: AppState) => ({
    ...state,
    categoriesFiltered: categories,
  }));

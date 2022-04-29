import { AppStateType } from "./../store";
export const getAppState = (state: AppStateType) => state.app;

export const getAppInitState = (state: AppStateType) =>
  getAppState(state).appInit;

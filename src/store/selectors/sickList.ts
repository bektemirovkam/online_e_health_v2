import { AppStateType } from "../store";

export const getSickListState = (state: AppStateType) => state.sickList;

export const getUserSickListState = (state: AppStateType) =>
  getSickListState(state).sickList;

export const getUserSickListErrorMessageState = (state: AppStateType) =>
  getSickListState(state).sickListError;

export const getSickListLoadingState = (state: AppStateType) =>
  getSickListState(state).isLoading;

export const getMedicalDoctypesState = (state: AppStateType) =>
  getSickListState(state).doctypes;

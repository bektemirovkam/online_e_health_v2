import { AppStateType } from "./../store";
const getHospitalsState = (state: AppStateType) => state.hospitals;

export const getHospitalsLoadingState = (state: AppStateType) =>
  getHospitalsState(state).isLoading;

export const getHospitalsForAppointmentState = (state: AppStateType) =>
  getHospitalsState(state).hospitalsForAppointment?.Orgs;

export const getHospitalsErrorState = (state: AppStateType) =>
  getHospitalsState(state).errorMessage;

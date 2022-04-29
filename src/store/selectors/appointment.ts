import { FormattedResponseAvailableDates } from "../../models/Hospital";
import { formatDateFromString } from "../../utils/formatDate";
import { AppStateType } from "./../store";

export const getAppointmentState = (state: AppStateType) => state.appointment;

export const getAppointmentUserDataState = (state: AppStateType) =>
  getAppointmentState(state).userData;

export const getAppointmentErrorMessageState = (state: AppStateType) =>
  getAppointmentState(state).errorMessage;

export const getAppointmentUserDataLoadingState = (state: AppStateType) =>
  getAppointmentState(state).isLoadingUserData;

export const getAppointmentProfileSpecDataState = (state: AppStateType) =>
  getAppointmentState(state).profileSpecsData;

export const getAppointmentScheduleState = (state: AppStateType) =>
  getAppointmentState(state).schedule;

export const getAppointmentScheduleLoadingState = (state: AppStateType) =>
  getAppointmentState(state).isLoadingSchedule;

export const getAppointmentProfileSpecLoadingState = (state: AppStateType) =>
  getAppointmentState(state).isLoadingProfileSpecs;

export const getAppointmentHouseCallResultState = (state: AppStateType) =>
  getAppointmentState(state).saveHouseCallResult;

export const getSaveAppointmentResultState = (state: AppStateType) =>
  getAppointmentState(state).saveAppointmentResult;

export const getSaveAppointmentLoadingState = (state: AppStateType) =>
  getAppointmentState(state).saveAppointmentLoading;

/*  NEW API  */

export const getBranchesState = (state: AppStateType) =>
  getAppointmentState(state).branches;

export const getBranchesLoadingState = (state: AppStateType) =>
  getAppointmentState(state).branchesLoading;

export const getSpecialitiesState = (state: AppStateType) =>
  getAppointmentState(state).specialities;

export const getSpecialitiesLoadingState = (state: AppStateType) =>
  getAppointmentState(state).specialitiesLoading;
export const getDoctorsState = (state: AppStateType) =>
  getAppointmentState(state).doctors;
export const getDoctorsLoadingState = (state: AppStateType) =>
  getAppointmentState(state).doctorsLoading;

// export const getNGScheduleState = (state: AppStateType) =>
//   getAppointmentState(state).ngSchedules;
export const getNGScheduleLoadingState = (state: AppStateType) =>
  getAppointmentState(state).ngSchedulesLoading;

export const getAvailableDatesState = (state: AppStateType) => {
  const response = getAppointmentState(state).availableDates;

  if (!response) {
    return null;
  } else {
    // форматирование для календаря в новой сетке
    const formattedObject: FormattedResponseAvailableDates =
      response.results_by_date.reduce((prev, dateItem) => {
        if (dateItem.available_dates.length > 0) {
          return {
            ...prev,
            [formatDateFromString(dateItem.date)]: dateItem.available_dates,
          };
        } else {
          return prev;
        }
      }, {});

    return formattedObject;
  }
};
// export const getAvailableDatesLoadingState = (state: AppStateType) =>
//   getAppointmentState(state).availableDatesLoading;

export const getSaveNGAppointmentLoadingState = (state: AppStateType) =>
  getAppointmentState(state).saveNGAppointmentLoading;
export const getSaveNGAppointmentResultState = (state: AppStateType) =>
  getAppointmentState(state).saveNGAppointmentResult;

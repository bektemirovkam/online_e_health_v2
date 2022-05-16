import { ThunkAction } from "redux-thunk";

import {
  DoctorTimetableFormattedType,
  GetDataListsForTimetableResponseType,
  GetMoListResponseType,
  GetOrgListForAppointmentResponseType,
  GetOrgListForRaitingsResponseType,
  GetOrgListForTimetableResponseType,
  GetOrgListForWorkEvaluationResponse,
  OrgsListForReferenceItemType,
  SaveWorkIndicatorsByUserResponseType,
  UniqIndicatorType,
} from "../../models/Hospital";
import { ActionsCreatorsTypes } from "../../models/App";
import { hospitalApi } from "../../services/hospitalApi";
import { AppStateType } from "../store";
import { appActions, AppActionsType } from "./app";

export const hospitalsActions = {
  setHospitalsForAppointment: (
    payload: GetOrgListForAppointmentResponseType | null
  ) =>
    ({
      type: "SET_HOSPITALS_FOR_APPOINTMENT",
      payload,
    } as const),

  setAllHospitals: (payload: GetOrgListForTimetableResponseType | null) =>
    ({
      type: "SET_ALL_HOSPITALS",
      payload,
    } as const),

  setHospitalsByWorkEvaluation: (
    payload: GetOrgListForWorkEvaluationResponse | null
  ) =>
    ({
      type: "SET_HOSPITALS_BY_EVALUATION",
      payload,
    } as const),

  setHospitalsError: (payload: string | null) =>
    ({
      type: "SET_HOSPITALS_ERROR",
      payload,
    } as const),

  setHospitalsLoading: (payload: boolean) =>
    ({
      type: "SET_HOSPITALS_LOADING",
      payload,
    } as const),

  setAllMO: (payload: GetMoListResponseType | null) =>
    ({
      type: "SET_ALL_MO",
      payload,
    } as const),

  setDataListForTimeTable: (
    payload: GetDataListsForTimetableResponseType | null
  ) =>
    ({
      type: "SET_DATA_LIST_FOR_TIMETABLE",
      payload,
    } as const),

  setDoctorsListLoading: (payload: boolean) =>
    ({
      type: "SET_DOCTORS_LIST_LOADING",
      payload,
    } as const),

  setDoctorTimetable: (payload: DoctorTimetableFormattedType | null) =>
    ({
      type: "SET_DOCTORS_TIMETABLE",
      payload,
    } as const),

  setDoctorTimetableLoading: (payload: boolean) =>
    ({
      type: "SET_DOCTORS_TIMETABLE_LOADING",
      payload,
    } as const),

  setDataListForRaitingLoading: (payload: boolean) =>
    ({
      type: "SET_DATA_LIST_FOR_RAITING_LOADING",
      payload,
    } as const),

  setListOfWorkIndicators: (payload: UniqIndicatorType[] | null) =>
    ({
      type: "SET_LIST_OF_WORKINDICATORS",
      payload,
    } as const),

  setScanDataListForRaiting: (
    payload: GetOrgListForRaitingsResponseType | null
  ) =>
    ({
      type: "SET_SCAN_DATA_LIST_FOR_RAITING",
      payload,
    } as const),

  setEvaluationResult: (payload: SaveWorkIndicatorsByUserResponseType | null) =>
    ({
      type: "SET_EVALUATION_RESULT",
      payload,
    } as const),

  setEvaluationResultLoading: (payload: boolean) =>
    ({
      type: "SET_EVALUATION_RESULT_LOADING",
      payload,
    } as const),
  setDataListForRaiting: (payload: GetOrgListForRaitingsResponseType | null) =>
    ({
      type: "SET_DATA_LIST_FOR_RAITING",
      payload,
    } as const),
  setOrgsListForReference: (payload: OrgsListForReferenceItemType[]) =>
    ({
      type: "SET_ORGS_LIST_FOR_REFERENCE",
      payload,
    } as const),
};

// THUNKS______________________________________________________________________________________________________________________________

export const getHospitalsForAppointment =
  (): ThunkAcionType => async (dispatch) => {
    try {
      dispatch(hospitalsActions.setHospitalsLoading(true));
      const respHospitals = await hospitalApi.GetOrgListForAppointment();
      if (respHospitals.ErrorCode !== 0) {
        dispatch(hospitalsActions.setHospitalsError(respHospitals.ErrorDesc));
      } else {
        dispatch(hospitalsActions.setHospitalsForAppointment(respHospitals));
      }
    } catch (error) {
      dispatch(
        hospitalsActions.setHospitalsError(
          "Ошибка при загрузки списка организаций"
        )
      );
    } finally {
      dispatch(hospitalsActions.setHospitalsLoading(false));
      dispatch(appActions.setAppInit(true));
    }
  };

export type HospitalsActionsType = ReturnType<
  ActionsCreatorsTypes<typeof hospitalsActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  HospitalsActionsType | AppActionsType
>;

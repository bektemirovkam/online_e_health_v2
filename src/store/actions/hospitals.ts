import { ThunkAction } from "redux-thunk";

import { GetOrgListForAppointmentResponseType } from "../../models/Hospital";
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

import { ThunkAction } from "redux-thunk";

import { userApi } from "../../services/userApi";
import {
  GetMedicalDocInfoType,
  MedicalDocResponseType,
} from "../../models/User";
import { ActionsCreatorsTypes } from "../../models/App";
import { AppStateType } from "../store";

export const sickListActions = {
  isLoading: (payload: boolean) =>
    ({
      type: "SET_SICK_LIST_LOADING",
      payload,
    } as const),

  setSickListInfo: (payload: GetMedicalDocInfoType | null) =>
    ({
      type: "SET_SICK_LIST_INFO",
      payload,
    } as const),

  setMedicalDoctypes: (payload: MedicalDocResponseType | null) =>
    ({
      type: "SET_MEDICAL_DOC_TYPES",
      payload,
    } as const),

  setSickListError: (payload: string | null) =>
    ({
      type: "SET_SICK_LIST_ERROR",
      payload,
    } as const),
};

// -------------------------- THUNKS -------------------------- //

export const getMedicalDocInfo =
  (orgId: string, listNumber: string, docType = 1, date = ""): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(sickListActions.isLoading(true));
      const sickListData = await userApi.GetMedicalDocInfo(
        orgId,
        listNumber,
        docType,
        date
      );
      if (sickListData.ErrorCode !== 0) {
        dispatch(sickListActions.setSickListError(sickListData.ErrorDesc));
      } else {
        dispatch(sickListActions.setSickListInfo(sickListData));
      }
    } catch (error) {
      dispatch(
        sickListActions.setSickListError(
          "Ошибка при загрузке данных о больничном листе"
        )
      );
    } finally {
      dispatch(sickListActions.isLoading(false));
    }
  };

export const getMedicalsDoctypes = (): ThunkAcionType => async (dispatch) => {
  try {
    const medicalsType = await userApi.GetMedicalDocTypes();
    if (medicalsType.ErrorCode !== 0) {
      dispatch(sickListActions.setSickListError(medicalsType.ErrorDesc));
    } else {
      dispatch(sickListActions.setMedicalDoctypes(medicalsType));
    }
  } catch (error) {
    dispatch(
      sickListActions.setSickListError("Ошибка при загрузке типов документа")
    );
  }
};

export type SickListActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof sickListActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  SickListActionTypes
>;

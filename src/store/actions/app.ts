import { ThunkAction } from "redux-thunk";

import { ActionsCreatorsTypes } from "../../models/App";
import { AppStateType } from "../store";

export const appActions = {
  setAppInit: (payload: boolean) => {
    return {
      type: "SET_APP_INIT",
      payload,
    } as const;
  },
};

// Проверяем на первый запуск приложения, на регистрацию и на наличие обновлений

export const bootstrap = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(appActions.setAppInit(true));
  } catch (e) {
    console.log("Bootstrap error -->", e);
  }
};

export type AppActionsType = ReturnType<
  ActionsCreatorsTypes<typeof appActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  AppActionsType
>;

import { AppActionsType } from "../actions/app";

const initialState = {
  appInit: false,
};

type initStateType = typeof initialState;

export const appReducer = (
  state = initialState,
  action: AppActionsType
): initStateType => {
  switch (action.type) {
    case "SET_APP_INIT": {
      return {
        ...state,
        appInit: action.payload,
      };
    }

    default:
      return state;
  }
};

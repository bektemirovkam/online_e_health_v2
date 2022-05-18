import { GetOrgListForAppointmentResponseType } from "../../models/Hospital";
import { HospitalsActionsType } from "../actions/hospitals";

const initialState = {
  isLoading: false,
  hospitalsForAppointment: null as GetOrgListForAppointmentResponseType | null,

  errorMessage: null as string | null,
};

type initStateType = typeof initialState;

export const hospitalsReducer = (
  state = initialState,
  action: HospitalsActionsType
): initStateType => {
  switch (action.type) {
    case "SET_HOSPITALS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case "SET_HOSPITALS_FOR_APPOINTMENT": {
      return {
        ...state,
        hospitalsForAppointment: action.payload,
      };
    }

    case "SET_HOSPITALS_ERROR": {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
};

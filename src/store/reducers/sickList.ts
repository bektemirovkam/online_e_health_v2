import { SickListActionTypes } from "../actions/sickList";
import {
  GetMedicalDocInfoType,
  MedicalDocResponseType,
} from "../../models/User";

const initialState = {
  sickListError: null as string | null,
  sickList: null as GetMedicalDocInfoType | null,
  doctypes: null as MedicalDocResponseType | null,
  isLoading: false,
};

type initStateType = typeof initialState;

export const sickListReducer = (
  state = initialState,
  action: SickListActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_SICK_LIST_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case "SET_SICK_LIST_INFO": {
      return {
        ...state,
        sickList: action.payload,
      };
    }

    case "SET_MEDICAL_DOC_TYPES": {
      return {
        ...state,
        doctypes: action.payload,
      };
    }

    case "SET_SICK_LIST_ERROR": {
      return {
        ...state,
        sickListError: action.payload,
      };
    }

    default:
      return state;
  }
};

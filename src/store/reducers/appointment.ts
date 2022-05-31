import { NGAppointmentDataHistoryType } from "../../models/Appointment";
import {
  BranchType,
  GetAvailableDatesResponseType,
  GetDoctorsItemType,
  SpecialitiesType,
} from "../../models/Hospital";
import { UserDataType } from "../../models/User";
import { AppointmentActionsType } from "../actions/appointment";

const initialState = {
  isLoadingUserData: false,
  userData: null as UserDataType | null,
  errorMessage: null as string | null,
  /*       NEW API        */
  branches: null as BranchType[] | null,
  branchesLoading: false,
  specialities: null as SpecialitiesType[] | null,
  specialitiesLoading: false,
  doctors: null as GetDoctorsItemType[] | null,
  doctorsLoading: false,
  ngSchedulesLoading: false,
  availableDates: null as GetAvailableDatesResponseType | null,
  saveNGAppointmentResult: null as NGAppointmentDataHistoryType | null,
  saveNGAppointmentLoading: false,
};

type initStateType = typeof initialState;

export const appointmentReducer = (
  state = initialState,
  action: AppointmentActionsType
): initStateType => {
  switch (action.type) {
    case "SET_APPOINTMENT_USER_DATA": {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case "SET_APPOINTMENT_LOADING_USER_DATA": {
      return {
        ...state,
        isLoadingUserData: action.payload,
      };
    }

    case "SET_APPOINTMENT_ERROR": {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    /*  NEW API */

    case "SET_BRANCHES": {
      return {
        ...state,
        branches: action.payload,
      };
    }

    case "SET_BRANCHES_LOADING": {
      return {
        ...state,
        branchesLoading: action.payload,
      };
    }

    case "SET_SPECIALITIES": {
      return {
        ...state,
        specialities: action.payload,
      };
    }

    case "SET_SPECIALITIES_LOADING": {
      return {
        ...state,
        specialitiesLoading: action.payload,
      };
    }

    case "SET_DOCTORS": {
      return {
        ...state,
        doctors: action.payload,
      };
    }

    case "SET_DOCTORS_LOADING": {
      return {
        ...state,
        doctorsLoading: action.payload,
      };
    }

    case "SET_NG_SCHEDULES_LOADING": {
      return {
        ...state,
        ngSchedulesLoading: action.payload,
      };
    }

    case "SET_AVAILABLE_DATES": {
      return {
        ...state,
        availableDates: action.payload,
      };
    }

    case "SET_SAVE_NG_APPOINTMENT_RESULT": {
      return {
        ...state,
        saveNGAppointmentResult: action.payload,
      };
    }

    case "SET_SAVE_NG_APPOINTMENT_LOADING": {
      return {
        ...state,
        saveNGAppointmentLoading: action.payload,
      };
    }

    default:
      return state;
  }
};

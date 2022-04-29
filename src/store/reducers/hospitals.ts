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
import { HospitalsActionsType } from "../actions/hospitals";

const initialState = {
  isLoading: false,
  hospitalsForAppointment: null as GetOrgListForAppointmentResponseType | null,
  allMO: null as GetMoListResponseType | null,
  allHospitals: null as GetOrgListForTimetableResponseType | null,
  errorMessage: null as string | null,
  dataListForTimetable: null as GetDataListsForTimetableResponseType | null,
  dataListForRaiting: null as GetOrgListForRaitingsResponseType | null,
  scanDataListForRaiting: null as GetOrgListForRaitingsResponseType | null,
  dataListForRaitingLoading: false,
  listOfWorkIndicators: null as UniqIndicatorType[] | null,
  evaluationResult: null as SaveWorkIndicatorsByUserResponseType | null,
  evaluationResultLoading: false,
  doctorsListLoading: false,
  doctorTimetable: null as DoctorTimetableFormattedType | null,
  doctorTimetableLoading: false,
  hospitalsByEvaluation: null as GetOrgListForWorkEvaluationResponse | null,
  hospitalsForRef: [] as OrgsListForReferenceItemType[],
};

type initStateType = typeof initialState;

export const hospitalsReducer = (
  state = initialState,
  action: HospitalsActionsType
): initStateType => {
  switch (action.type) {
    case "SET_ALL_MO": {
      return {
        ...state,
        allMO: action.payload,
      };
    }

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

    case "SET_ALL_HOSPITALS": {
      return {
        ...state,
        allHospitals: action.payload,
      };
    }

    case "SET_HOSPITALS_ERROR": {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case "SET_DATA_LIST_FOR_TIMETABLE": {
      return {
        ...state,
        dataListForTimetable: action.payload,
      };
    }

    case "SET_DOCTORS_LIST_LOADING": {
      return {
        ...state,
        doctorsListLoading: action.payload,
      };
    }

    case "SET_DOCTORS_TIMETABLE": {
      return {
        ...state,
        doctorTimetable: action.payload,
      };
    }

    case "SET_DOCTORS_TIMETABLE_LOADING": {
      return {
        ...state,
        doctorTimetableLoading: action.payload,
      };
    }

    case "SET_DATA_LIST_FOR_RAITING": {
      return {
        ...state,
        dataListForRaiting: action.payload,
      };
    }

    case "SET_DATA_LIST_FOR_RAITING_LOADING": {
      return {
        ...state,
        dataListForRaitingLoading: action.payload,
      };
    }

    case "SET_LIST_OF_WORKINDICATORS": {
      return {
        ...state,
        listOfWorkIndicators: action.payload,
      };
    }

    case "SET_SCAN_DATA_LIST_FOR_RAITING": {
      return {
        ...state,
        scanDataListForRaiting: action.payload,
      };
    }

    case "SET_EVALUATION_RESULT": {
      return {
        ...state,
        evaluationResult: action.payload,
      };
    }

    case "SET_EVALUATION_RESULT_LOADING": {
      return {
        ...state,
        evaluationResultLoading: action.payload,
      };
    }

    case "SET_HOSPITALS_BY_EVALUATION": {
      return {
        ...state,
        hospitalsByEvaluation: action.payload,
      };
    }

    case "SET_ORGS_LIST_FOR_REFERENCE": {
      return {
        ...state,
        hospitalsForRef: action.payload,
      };
    }

    default:
      return state;
  }
};

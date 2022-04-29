import { AppStateType } from "./../store";
const getHospitalsState = (state: AppStateType) => state.hospitals;

export const getHospitalsLoadingState = (state: AppStateType) =>
  getHospitalsState(state).isLoading;

export const getHospitalsForAppointmentState = (state: AppStateType) =>
  getHospitalsState(state).hospitalsForAppointment?.Orgs;

export const getPaidHospitalsForAppointmentState = (state: AppStateType) => {
  const paidHospitalsID = ["335", "45500000000000184"]; // взрослая областная, есиль диагностик

  return getHospitalsState(state).hospitalsForAppointment?.Orgs.filter((org) =>
    paidHospitalsID.includes(org.OrgID)
  );
};

// запись к узким специалистам

export const getProfileHospitalsForAppointmentState = (state: AppStateType) => {
  const profileHospitalsID = ["0", "1167", "336"]; //Поликлиника прикрепления, Обл. стоматологическая поликлиника, 336????

  return getHospitalsForAppointmentState(state)?.filter((org) =>
    profileHospitalsID.includes(org.OrgID)
  );
};

export const getAllHospitalsState = (state: AppStateType) =>
  getHospitalsState(state).allHospitals;

export const getHospitalsErrorState = (state: AppStateType) =>
  getHospitalsState(state).errorMessage;

export const getHospitalsForSickListState = (state: AppStateType) => {
  const hospitalsState = getAllHospitalsState(state);
  if (hospitalsState) {
    const filterHospitals = hospitalsState.Orgs.filter(
      (item) => item.SickListsSearch
    );
    hospitalsState.Orgs = filterHospitals;
  }
  return hospitalsState;
};

// для записи на платный прием

export const getHospitalsForPaidAppointmentState = (state: AppStateType) => {
  return getHospitalsForAppointmentState(state)?.filter(
    (hospital) =>
      hospital.OrgID === "335" || hospital.OrgID === "45500000000000184"
  ); // есиль диагностик || областная взрослая пол-ка
};

// для справочника организаций

export const getAllMOState = (state: AppStateType) =>
  getHospitalsState(state).allMO;

export const getAllMOLocals = (state: AppStateType) =>
  getAllMOState(state)?.locals;

export const getAllMOTypes =
  (localityValue: string) => (state: AppStateType) => {
    const moList = getAllMOState(state)?.DataList;
    if (moList) {
      const filterMOList = moList.filter((mo) => mo.City === localityValue);

      const typesName = new Set<string>();
      const typesApp = [];

      for (const org of filterMOList) {
        if (org.OrgType) {
          typesName.add(org.OrgType);
        }
      }
      //@ts-ignore
      for (const type of typesName) {
        typesApp.push({ label: type, value: type });
      }

      return typesApp;
    } else {
      return [];
    }
  };

export const getAllMOList =
  (localityValue: string, typeValue: string, searchInput: string) =>
  (state: AppStateType) => {
    const moList = getAllMOState(state)?.DataList;
    if (moList && (typeValue || searchInput)) {
      const filterMOList = moList.filter((mo) => {
        if (!typeValue) {
          return (
            mo.City === localityValue &&
            mo.Name?.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
        return (
          mo.City === localityValue &&
          mo.OrgType === typeValue &&
          mo.Name?.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      return filterMOList;
    } else {
      return [];
    }
  };

// для расписания врачей

export const getDataListForTimetableState = (state: AppStateType) =>
  getHospitalsState(state)?.dataListForTimetable;

export const getOrgDoctorsListState = (state: AppStateType) =>
  getDataListForTimetableState(state)?.ListsMap;

export const getOrgDoctorsListLoadingState = (state: AppStateType) =>
  getHospitalsState(state)?.doctorsListLoading;

export const getDoctorTimetableState = (state: AppStateType) =>
  getHospitalsState(state)?.doctorTimetable?.Timetable;

export const getDoctorTimetableLoadingState = (state: AppStateType) =>
  getHospitalsState(state)?.doctorTimetableLoading;

// для оценки работы врача

export const getDoctorsListForRaitingState = (state: AppStateType) =>
  getHospitalsState(state).dataListForRaiting?.ListsMap;

export const getScanDoctorsListForRaitingState = (state: AppStateType) =>
  getHospitalsState(state).scanDataListForRaiting?.ListsMap;

export const getDataListForRaitingLoadingState = (state: AppStateType) =>
  getHospitalsState(state).dataListForRaitingLoading;

export const getListForWorkIndicatorsState = (state: AppStateType) =>
  getHospitalsState(state).listOfWorkIndicators;

export const getEvaluationResultState = (state: AppStateType) =>
  getHospitalsState(state).evaluationResult;

export const getEvaluationResultLoadingState = (state: AppStateType) =>
  getHospitalsState(state).evaluationResultLoading;

export const getHospitalByWorkEvaluationState = (state: AppStateType) =>
  getHospitalsState(state).hospitalsByEvaluation;

// список доступных организаций для записи на прием

export const getOrgsListForReferenceState = (state: AppStateType) =>
  getHospitalsState(state).hospitalsForRef;

import { formatter } from "./../../utils/formatToBase64";
import {
  GetAvailableDatesResponseType,
  ScheduleVariantTypes,
} from "./../../models/Hospital";
import { ThunkAction } from "redux-thunk";

import { userApi } from "../../services/userApi";
import { newHospitalApi } from "../../services/hospitalApi";
import { AppActionsType } from "./app";
import { ActionsCreatorsTypes } from "../../models/App";
import { AppStateType } from "../store";
import { UserDataType } from "../../models/User";
import {
  BranchType,
  GetDoctorsItemType,
  SpecialitiesType,
} from "../../models/Hospital";
import {
  AppointmentInfoType,
  NGAppointmentDataHistoryType,
} from "../../models/Appointment";
import { newAppApi } from "../../services/appApi";
import { formatDateFromString, getNowDate } from "../../utils/formatDate";

export const appointmentActions = {
  setAppointmentUserData: (payload: UserDataType | null) =>
    ({
      type: "SET_APPOINTMENT_USER_DATA",
      payload,
    } as const),
  setAppointmentLoadingUserData: (payload: boolean) =>
    ({
      type: "SET_APPOINTMENT_LOADING_USER_DATA",
      payload,
    } as const),

  setAppointmentError: (payload: string | null) =>
    ({
      type: "SET_APPOINTMENT_ERROR",
      payload,
    } as const),

  /* NEW */
  setNGBranches: (payload: BranchType[] | null) =>
    ({
      type: "SET_BRANCHES",
      payload,
    } as const),
  setNGBranchesLoading: (payload: boolean) =>
    ({
      type: "SET_BRANCHES_LOADING",
      payload,
    } as const),
  setNGSpecialities: (payload: null | SpecialitiesType[]) =>
    ({
      type: "SET_SPECIALITIES",
      payload,
    } as const),
  setNGSpecialitiesLoading: (payload: boolean) =>
    ({
      type: "SET_SPECIALITIES_LOADING",
      payload,
    } as const),
  setNGDoctors: (payload: GetDoctorsItemType[]) =>
    ({
      type: "SET_DOCTORS",
      payload,
    } as const),
  setNGDoctorsLoading: (payload: boolean) =>
    ({
      type: "SET_DOCTORS_LOADING",
      payload,
    } as const),

  setNGSchedulesLoading: (payload: boolean) =>
    ({
      type: "SET_NG_SCHEDULES_LOADING",
      payload,
    } as const),
  setNGAvailablesDate: (payload: GetAvailableDatesResponseType | null) =>
    ({
      type: "SET_AVAILABLE_DATES",
      payload,
    } as const),

  setNGAppointmentSaveResult: (payload: NGAppointmentDataHistoryType | null) =>
    ({
      type: "SET_SAVE_NG_APPOINTMENT_RESULT",
      payload,
    } as const),
  setNGAppointmentSaveLoading: (payload: boolean) =>
    ({
      type: "SET_SAVE_NG_APPOINTMENT_LOADING",
      payload,
    } as const),
};

// для записи на платный прием и запись к узким специалистам
export const getAppointmentUserData =
  (iin: string): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setAppointmentError(null));
      dispatch(appointmentActions.setAppointmentLoadingUserData(true));
      const userData = await userApi.GetPatientByIIN(iin);

      if (
        userData.ErrorCode === 300 ||
        userData.ErrorCode === 200 ||
        userData.ErrorCode === 100
      ) {
        dispatch(appointmentActions.setAppointmentError(userData.ErrorDesc));
      } else {
        dispatch(appointmentActions.setAppointmentUserData(userData));
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка при получении данных о пользователе!"
        )
      );
    } finally {
      dispatch(appointmentActions.setAppointmentLoadingUserData(false));
    }
  };

/***************************** NEW API *****************************/

export const getBranches =
  (orgId: string): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGBranchesLoading(true));

      const { token } = await newAppApi.getToken({ destination_mo: orgId });

      const branchesResp = await newHospitalApi.getBranches({
        token,
        destination_mo: orgId,
      });

      if (!branchesResp.success) {
        dispatch(
          appointmentActions.setAppointmentError(branchesResp.error_message)
        );
      } else {
        dispatch(appointmentActions.setNGBranches(branchesResp.branches));
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось получить данные о подразделениях!"
        )
      );
    } finally {
      dispatch(appointmentActions.setNGBranchesLoading(false));
    }
  };

export const getSpecialities =
  (orgId: string, mo_code: string | null = null): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGSpecialitiesLoading(true));
      const { token } = await newAppApi.getToken({ destination_mo: orgId });
      const specialitiesResp = await newHospitalApi.getSpeciality({
        token,
        destination_mo: orgId,
        mo_code,
      });

      if (!specialitiesResp.success) {
        dispatch(
          appointmentActions.setAppointmentError(specialitiesResp.error_message)
        );
      } else {
        dispatch(
          appointmentActions.setNGSpecialities(specialitiesResp.specialities)
        );
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось получить данных по специализациям!"
        )
      );
    } finally {
      dispatch(appointmentActions.setNGSpecialitiesLoading(false));
    }
  };

// Получает список всех врачей подразделения (филиала) по специализации.
// Структура данных такая же как и в getDoctors,
// Поэтому сохраняем в сторе туда же (doctorsLoading, doctors)
export const getDoctorsBySpeciality =
  (
    orgId: string,
    doc_speciality_id: string,
    mo_code: string | null = null
  ): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGDoctorsLoading(true));

      const { token } = await newAppApi.getToken({ destination_mo: orgId });
      const doctorsResp = await newHospitalApi.getDoctorsBySpeciality({
        token,
        destination_mo: orgId,
        mo_code,
        doc_speciality_id,
      });

      if (!doctorsResp.success) {
        dispatch(
          appointmentActions.setAppointmentError(doctorsResp.error_message)
        );
      } else {
        dispatch(appointmentActions.setNGDoctors(doctorsResp.doctors));
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось получить список врачей!"
        )
      );
    } finally {
      dispatch(appointmentActions.setNGDoctorsLoading(false));
    }
  };

// Получает список всех врачей из графиков работы подразделения (филиала).
// Структура данных такая же как и в getDoctorsBySpeciality,
// Поэтому сохраняем в сторе туда же (doctorsLoading, doctors)
export const getDoctors =
  (orgId: string, mo_code: string | null = null): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGDoctorsLoading(true));

      const { token } = await newAppApi.getToken({ destination_mo: orgId });
      const doctorsResp = await newHospitalApi.getDoctors({
        token,
        destination_mo: orgId,
        mo_code,
      });

      if (!doctorsResp.success) {
        dispatch(
          appointmentActions.setAppointmentError(doctorsResp.error_message)
        );
      } else {
        dispatch(appointmentActions.setNGDoctors(doctorsResp.doctors));
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось получить список врачей!"
        )
      );
    } finally {
      dispatch(appointmentActions.setNGDoctorsLoading(false));
    }
  };

export const getSchedulesByDoctor =
  (
    orgId: string,
    doctor_id: string,
    schedule_type: ScheduleVariantTypes,
    mo_code = null
  ): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGSchedulesLoading(true));

      const { token } = await newAppApi.getToken({ destination_mo: orgId });

      const schedulesResp = await newHospitalApi.getSchedulesByDoctor({
        token,
        mo_code,
        doctor_id,
        destination_mo: orgId,
        schedule_type,
      });

      if (schedulesResp.success) {
        const schedules_id_array = schedulesResp.schedules.map(
          (schedule) => schedule.schedule_data.schedule_id
        );

        const dateFrom = getNowDate();

        const dateTo = formatDateFromString(
          // 2 недели
          Date.now() + 14 * 86400 * 1000,
          "YYYY-MM-DD"
        );

        dispatch(
          getAvailableDates(
            orgId,
            schedules_id_array,
            dateFrom,
            dateTo,
            schedule_type
          )
        );
      } else {
        dispatch(
          appointmentActions.setAppointmentError(schedulesResp.error_message)
        );
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось получить данные об расписании врача!"
        )
      );
      dispatch(appointmentActions.setNGSchedulesLoading(false));
    }
  };

export const getNGSchedules =
  (
    orgId: string,
    speciality: string,
    schedule_type: ScheduleVariantTypes,
    mo_code = null
  ): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGSchedulesLoading(true));

      const { token } = await newAppApi.getToken({ destination_mo: orgId });

      const schedulesResp = await newHospitalApi.getSchedule({
        token,
        mo_code,
        destination_mo: orgId,
        speciality,
        schedule_type,
      });

      if (schedulesResp.success) {
        const schedules_id_array = schedulesResp.schedules.map(
          (schedule) => schedule.schedule_id
        );

        const dateFrom = getNowDate();

        const dateTo = formatDateFromString(
          // 2 недели
          Date.now() + 14 * 86400 * 1000,
          "YYYY-MM-DD"
        );

        dispatch(
          getAvailableDates(
            orgId,
            schedules_id_array,
            dateFrom,
            dateTo,
            schedule_type
          )
        );
      } else {
        dispatch(
          appointmentActions.setAppointmentError(schedulesResp.error_message)
        );
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось получить данные по расписаниям врачей"
        )
      );
      dispatch(appointmentActions.setNGSchedulesLoading(false));
    }
  };

export const getAvailableDates =
  (
    orgId: string,
    schedule_id_array: string[],
    date_from: string,
    date_to: string,
    schedule_type: ScheduleVariantTypes
  ): ThunkAcionType =>
  async (dispatch) => {
    try {
      const { token } = await newAppApi.getToken({ destination_mo: orgId });

      const availableDatesResp = await newHospitalApi.getAvailableDates({
        token,
        destination_mo: orgId,
        schedule_id_array,
        date_from,
        date_to,
        schedule_type,
      });

      if (availableDatesResp.success) {
        dispatch(appointmentActions.setNGAvailablesDate(availableDatesResp));
      } else {
        dispatch(
          appointmentActions.setAppointmentError(
            availableDatesResp.error_message
          )
        );
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось загрузить данные!"
        )
      );
    } finally {
      dispatch(appointmentActions.setNGSchedulesLoading(false));
    }
  };

export const createNGAppointment =
  (
    orgId: string,
    schedule_id: string,
    appointment_date: string,
    IIN: string,
    info: AppointmentInfoType,
    appointment_duration = 1
  ): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(appointmentActions.setNGAppointmentSaveLoading(true));

      const iin = await formatter.toSHA1(IIN);
      const { token } = await newAppApi.getToken({ destination_mo: orgId });

      const saveAppointmentResp = await newHospitalApi.createAppointment({
        token,
        destination_mo: orgId,
        schedule_id,
        iin,
        appointment_date,
        appointment_duration,
      });

      if (saveAppointmentResp.success) {
        const newAppointmentResult = {
          ...saveAppointmentResp,
          ...info,
          iin,
        };

        dispatch(
          appointmentActions.setNGAppointmentSaveResult(newAppointmentResult)
        );
      } else {
        dispatch(
          appointmentActions.setAppointmentError(
            saveAppointmentResp.error_message
          )
        );
      }
    } catch (error) {
      dispatch(
        appointmentActions.setAppointmentError(
          "Ошибка сети! Не удалось записаться на прием!"
        )
      );
    } finally {
      dispatch(appointmentActions.setNGAppointmentSaveLoading(false));
    }
  };

export type AppointmentActionsType = ReturnType<
  ActionsCreatorsTypes<typeof appointmentActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  AppointmentActionsType | AppActionsType
>;

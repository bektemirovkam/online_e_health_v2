import {
  GetAvailableDatesRequestType,
  GetAvailableDatesResponseType,
  GetBranchesRequestType,
  GetBranchesResponseType,
  GetDoctorsBySpecialityRequestType,
  GetDoctorsBySpecialityResponseType,
  GetDoctorsRequestType,
  GetDoctorsResponseType,
  GetOrgListForAppointmentResponseType,
  GetProfileSpecsDataResponseType,
  GetSchedulesByDoctorRequestType,
  GetSchedulesByDoctorResponseType,
  GetScheduleResponseType,
  GetSpecialityRequestType,
  GetSpecialityResponseType,
  NewGetScheduleRequestType,
  NewGetScheduleResponseType,
} from "../models/Hospital";
import {
  CreateAppointmentRequestType,
  CreateAppointmentResponseType,
  SaveAppointmentResponseType,
  SaveDoctorCallResponseType,
} from "../models/Appointment";

import axios from "../api/axios";

export const hospitalApi = {
  GetOrgListForAppointment: async () => {
    const { data } = await axios.get<GetOrgListForAppointmentResponseType>(
      "GetOrgListForAppointment"
    );
    return data;
  },

  GetSchedule: async (
    orgId: string,
    IIN: string,
    DoctorId = "",
    profileId = ""
  ) => {
    const { data } = await axios.post<GetScheduleResponseType>("GetShedule", {
      orgId,
      IIN,
      DoctorId,
      profileId,
    });
    return data;
  },

  GetProfileSpecsData: async (orgId: string) => {
    const { data } = await axios.post<GetProfileSpecsDataResponseType>(
      "GetProfileSpecsData",
      { orgId }
    );
    return data;
  },

  SaveAppointment: async (
    iin: string,
    orgId: string,
    doctorId: string,
    date: string,
    timeStart: string,
    timeEnd: string,
    recordingMethod = 1,
    cabinetId = "",
    reason = "",
    language = 1
  ) => {
    const { data } = await axios.post<SaveAppointmentResponseType>(
      "SaveAppointment",
      {
        iin,
        orgId,
        doctorId,
        date,
        timeStart,
        timeEnd,
        recordingMethod,
        cabinetId,
        reason,
        language,
      }
    );

    return data;
  },

  SaveDoctorCall: async (
    iin: string,
    orgId: string,
    phoneNumber: string,
    reason = "",
    recordingMethod = 1,
    language = 1
  ) => {
    const { data } = await axios.post<SaveDoctorCallResponseType>(
      "SaveDoctorCall",
      { iin, orgId, phoneNumber, reason, recordingMethod, language }
    );

    return data;
  },
};

// ******************************************************  NEW API  *************************************************************** //

export const newHospitalApi = {
  //Получает список филиалов.
  getBranches: async (formData: GetBranchesRequestType) => {
    const { data } = await axios.post<GetBranchesResponseType>(
      "getNGBranches",
      formData
    );
    return data;
  },

  // Получает список специализаций по id СУР филиала
  getSpeciality: async (formData: GetSpecialityRequestType) => {
    const { data } = await axios.post<GetSpecialityResponseType>(
      "getNGSpeciality",
      formData
    );
    return data;
  },

  /*
   По специализации получает данные графиков работы, в которых есть данная специализация:
   расписание, кабинет, список врачей.
  */
  getSchedule: async (formData: NewGetScheduleRequestType) => {
    const { data } = await axios.post<NewGetScheduleResponseType>(
      "getNGSchedule",
      formData
    );
    return data;
  },

  // Получает свободные даты графика работы в указанный в запросе день.
  getAvailableDates: async (formData: GetAvailableDatesRequestType) => {
    const { data } = await axios.post<GetAvailableDatesResponseType>(
      "getAvailableDates",
      formData
    );
    return data;
  },

  // Получает список всех врачей из графиков работы подразделения (филиала).
  getDoctors: async (formData: GetDoctorsRequestType) => {
    const { data } = await axios.post<GetDoctorsResponseType>(
      "getNGDoctors",
      formData
    );
    return data;
  },

  /*
    Получает все графики, в которых состоит врач. Ответ включает идентификатор для метода
    «getavailabledates».
  */
  getSchedulesByDoctor: async (formData: GetSchedulesByDoctorRequestType) => {
    const { data } = await axios.post<GetSchedulesByDoctorResponseType>(
      "getSchedulesByDoctor",
      formData
    );
    return data;
  },
  /*
    Получает список всех врачей подразделения (филиала) по специализации.
  */
  getDoctorsBySpeciality: async (
    formData: GetDoctorsBySpecialityRequestType
  ) => {
    const { data } = await axios.post<GetDoctorsBySpecialityResponseType>(
      "getDoctorsBySpeciality",
      formData
    );
    return data;
  },

  /* 
    Позволяет создавать записи на приемы. Поля «is_online» и «url_link» необязательны и предназначены
    для записей на онлайн-приемы.
  */
  createAppointment: async (formData: CreateAppointmentRequestType) => {
    const { data } = await axios.post<CreateAppointmentResponseType>(
      "createNGAppointment",
      formData
    );
    return data;
  },
};

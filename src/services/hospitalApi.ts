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
  GetSchedulesByDoctorRequestType,
  GetSchedulesByDoctorResponseType,
  GetSpecialityRequestType,
  GetSpecialityResponseType,
  NewGetScheduleRequestType,
  NewGetScheduleResponseType,
} from "../models/Hospital";
import {
  CreateAppointmentRequestType,
  CreateAppointmentResponseType,
} from "../models/Appointment";

import axios from "../api/axios";

export const hospitalApi = {
  GetOrgListForAppointment: async () => {
    const { data } = await axios.get<GetOrgListForAppointmentResponseType>(
      "GetOrgListForAppointment"
    );
    return data;
  },
};

// ******************************************************  NEW API  *************************************************************** //

export const newHospitalApi = {
  //Получает список филиалов.
  getBranches: async (formData: GetBranchesRequestType) => {
    const { data } = await axios.post<GetBranchesResponseType>(
      "GetNGBranches",
      formData
    );
    return data;
  },

  // Получает список специализаций по id СУР филиала
  getSpeciality: async (formData: GetSpecialityRequestType) => {
    const { data } = await axios.post<GetSpecialityResponseType>(
      "GetNGSpeciality",
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
      "GetNGSchedule",
      formData
    );
    return data;
  },

  // Получает свободные даты графика работы в указанный в запросе день.
  getAvailableDates: async (formData: GetAvailableDatesRequestType) => {
    const { data } = await axios.post<GetAvailableDatesResponseType>(
      "GetAvailableDates",
      formData
    );
    return data;
  },

  // Получает список всех врачей из графиков работы подразделения (филиала).
  getDoctors: async (formData: GetDoctorsRequestType) => {
    const { data } = await axios.post<GetDoctorsResponseType>(
      "GetNGDoctors",
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
      "GetSchedulesByDoctor",
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
      "GetDoctorsBySpeciality",
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
      "CreateNGAppointment",
      formData
    );
    return data;
  },
};

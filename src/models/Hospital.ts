export type OrgInfoByAppointmentType = {
  OrgID: string;
  Name: string;
  ShowMessage: boolean;
  MessageText: string;
  DisableDoctorSelection: boolean;
  ApiVersion: 1 | 2;
};

export type OrgInfoByTimeTableType = {
  OrgID: string;
  Name: string;
  SickListsSearch: boolean;
  FreeAppointment: boolean;
};

export type GetOrgListForAppointmentResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100;
  Orgs: OrgInfoByAppointmentType[];
};

// ******************************************************  NEW API  *************************************************************** //

export type BranchType = {
  mo_code: string | null;
  name_ru: string;
  name_ru_short?: string;
};

export type GetBranchesResponseType = {
  success: boolean;
  error_message: string;
  branches: BranchType[];
};

export type GetBranchesRequestType = {
  token: string;
  destination_mo: string;
};

export type GetSpecialityRequestType = {
  token: string;
  mo_code: string | null;
  destination_mo: string;
};

export type SpecialitiesType = {
  doc_speciality: string;
  doc_speciality_id: string;
};

export type GetSpecialityResponseType = {
  success: string;
  error_message: string;
  specialities: SpecialitiesType[];
};

export type ScheduleDayType = {
  work_start_tm: string;
  is_workday: boolean;
  work_end_tm: string;
  break_start_tm: string;
  break_end_tm: string;
};

type Doc = {
  doc_name: string;
};

export type NGWeekItemType = {
  thursday: ScheduleDayType;
  wednesday: ScheduleDayType;
  monday: ScheduleDayType;
  tuesday: ScheduleDayType;
  friday: ScheduleDayType;
  saturday: ScheduleDayType;
  sunday: ScheduleDayType;
};

export type ScheduleDataType = {
  schedule_type_name: string;
  schedule_type_id: string;
  room_description: string;
  room_num: string;
  step: number;
  url_link: string;
  timetable: NGWeekItemType;
};

export type GetDoctorsRequestType = {
  token: string;
  mo_code: string | null;
  destination_mo: string;
};

export type GetDoctorsItemType = {
  doctor_id: string;
  full_name: string;
  id_sur: string;
  specialities: SpecialityType[];
};

export type GetDoctorsResponseType = {
  success: boolean;
  error_message: string;
  doctors: GetDoctorsItemType[];
};

export type GetDoctorsBySpecialityRequestType = {
  token: string;
  mo_code: string | null;
  doc_speciality_id: string;
  destination_mo: string;
};

type SpecialityType = {
  speciality_name: string;
  speciality_id: string;
};

export type GetDoctorsBySpecialityResponseType = {
  success: boolean;
  error_message: string;
  doctors: GetDoctorsItemType[];
};

export type GetDoctorsByScheduleRequestType = {
  success: boolean;
  error_message: string;
  doctors: Exclude<GetDoctorsItemType, "specialities">[];
  destination_mo: string;
};

export type GetDistrictDoctorRequestType = {
  token: string;
  iin: string;
  destination_mo: string;
};

export type DistrictDoctorType = {
  doctor_id: string;
  full_name: string;
  id_sur: string;
};

export type GetDistrictDoctorResponseType = {
  success: boolean;
  error_message: string;
  district: string;
  doctor: DistrictDoctorType;
};

/* getschedules end */

export type NewScheduleItemType = {
  schedule_data: {
    docs: Doc[];
  };
  schedule_id: string;
  schedule_name: string;
  speciality_name: string;
  speciality_id: string;
  schedule: ScheduleDataType[];
};

export type NewGetScheduleResponseType = {
  success: boolean;
  error_message: string;
  id: string;
  dt: string;
  doc_speciality: string;
  schedules: NewScheduleItemType[];
};

export type NewGetScheduleRequestType = {
  token: string;
  mo_code: string | null;
  speciality: string;
  destination_mo: string;
  schedule_type: ScheduleVariantTypes;
};

export enum ScheduleVariantsEnum {
  "NO_RESTRICTION" = "1",
  "DISTRICT" = "2",
  "PROFILE" = "3",
  "PAID" = "4",
}

export type ScheduleVariantTypes = ScheduleVariantsEnum[];

export type GetSchedulesByDoctorRequestType = {
  token: string;
  doctor_id: string;
  destination_mo: string;
  mo_code: string | null;
  schedule_type: ScheduleVariantTypes;
};

export type GetSchedulesByDoctorResponseType = {
  success: boolean;
  error_message: string;
  schedules: NewScheduleByDoctorItemType[];
};

export type NewScheduleByDoctorItemType = {
  schedule_data: {
    docs: Doc[];
    schedule_id: string;
    schedule: ScheduleDataType[];
    schedule_name: string;
    speciality_name: string;
    speciality_id: string;
  };
};
/* getschedules end */

/* getavailabledates */

export type GetAvailableDatesRequestType = {
  token: string;
  schedule_id_array: string[];
  date_from: string;
  date_to: string;
  schedule_type: ScheduleVariantTypes;
  destination_mo: string;
};

export type AvailableResultType = {
  date: string;
  available_dates: AvailableDateType[];
};

export type AvailableDateType = {
  date_begin: string;
  schedules_data: AvailableScheduleItem[];
};

export type AvailableScheduleItem = {
  schedule_id: string;
  schedule_type_id: number;
  schedule_type_name: string;
  schedule_name: string;
  room_num: string;
  room_description: string;
  date_end: string;
  step: number;
  main_doctor: string;
};

export type GetAvailableDatesResponseType = {
  success: boolean;
  error_message: string;
  results_by_date: AvailableResultType[];
};

export type FormattedResponseAvailableDates = {
  [key: string]: AvailableDateType[];
};

/* getavailabledates end */

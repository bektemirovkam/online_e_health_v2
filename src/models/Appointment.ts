export type AppointmentInfoType = {
  doctorName?: string;
  orgId?: string;
  timeStart?: string;
  data?: string;
  specializationName?: string;
  patientName?: string;
  room_description?: string;
  schedule_name?: string;
  apiVersion: "1" | "2";
};

export type RecordAttachmentType =
  | "К участковому врачу"
  | "К узким специалистам";

export type RecordMethodType = "По ФИО" | "По специализации";

export type RecordMetodsType = "specialization" | "FIO";

// ******************************************************  NEW API  *************************************************************** //

export type CreateAppointmentRequestType = {
  token: string;
  schedule_id: string;
  iin: string; // хэш SHA1 от ИИНа пациента, на которого создаётся запись на приём.
  appointment_date: string;
  appointment_duration: number;
  destination_mo: string;
  is_online?: boolean;
  url_link?: string;
};
export type CreateAppointmentResponseType = {
  success: boolean;
  error_message: string;
  appointment_id: string;
};

export type CancelAppointmentRequestType = {
  token: string;
  appointment_id: string;
  destination_mo: string;
};
export type CancelAppointmentResponseType = {
  success: boolean;
  error_message: string;
};

export type NGAppointmentDataHistoryType = CreateAppointmentResponseType &
  AppointmentInfoType;

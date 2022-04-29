export type AppointmentInfoType = {
  orgName?: string;
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

export type HouseCallInfoType = {
  orgName: string;
  orgId: string;
  patientName: string;
  doctorName: string;
};

export type SaveAppointmentResponseType = {
  ReceiptNumber?: string;
  GUID?: string;
  RegDateTime?: string;
  ErrorDesc: string;
  ErrorCode:
    | 0
    | 2
    | 10
    | 100
    | 110
    | 200
    | 300
    | 310
    | 400
    | 410
    | 500
    | 510
    | 600
    | 610
    | 700
    | 800
    | 900
    | 910
    | 920
    | 930
    | 1000
    | 1100;
};

export type SaveDoctorCallResponseType = {
  RegDateTime?: string;
  GUID?: string;
  ErrorDesc: string;
  ErrorCode:
    | 0
    | 2
    | 10
    | 100
    | 200
    | 400
    | 500
    | 600
    | 610
    | 700
    | 800
    | 900
    | 910
    | 1000
    | 1010
    | 1020
    | 1100;
};

export type СancelReceptionResponseType = {
  UnegDateTime?: string;
  ErrorDesc: string;
  ErrorCode: 0 | 2 | 10 | 100 | 200 | 210 | 300 | 400 | 500 | 510 | 520 | 530;
};

export type HouseCallDataHistoryType = SaveDoctorCallResponseType &
  HouseCallInfoType & {
    iin: string;
    dateCancel: null | string;
  };

export type AppointmentDataHistoryType = SaveAppointmentResponseType &
  AppointmentInfoType & {
    iin: string;
    dateCancel: null | string;
  };

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

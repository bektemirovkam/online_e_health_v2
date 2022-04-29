import {
  AppointmentDataHistoryType,
  HouseCallDataHistoryType,
  NGAppointmentDataHistoryType,
} from "./Appointment";

export type ActionsCreatorsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type SelectItemType = {
  label: string;
  value: string;
};

export type FeedBackFormData = {
  type: "error-feedback" | "comment-feedback";
  name: string;
  phone: string;
  comment: string;
};

export type PushTokenType = {
  os: string;
  token: string;
};

export type ServerTimeResponseType = {
  ErrorCode: number;
  ErrorDesc: string;
  ServerTime: string;
};

export type UpdateSubscriberResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100;
  DeviceGUID: string;
};

export type GetNewMessageCountResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100 | 110;
  MessagesCount: number;
};

export type GetMessagesForUserResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100 | 110;
  MessagesCount: number;
  Messages: MessageType[];
};

export type MessageType = {
  MessageGUID: string;
  Date: string;
  Text: string;
  IsNew: boolean;
};

export type ConfirmMessageViewResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100 | 110 | 120 | 130 | 140;
};

export type AppHistoryType = {
  appointments: (AppointmentDataHistoryType | NGAppointmentDataHistoryType)[];
  houseCalls: HouseCallDataHistoryType[];
};

export type GetRegistrationTokenRequestType = {
  application: "com.profit.patientcab";
  sandbox: false;
  apns_tokens: string[];
};

export type RegTokenType = {
  registration_token: string;
  apns_token: string;
  status: string;
};

export type GetRegistrationTokenResponseType = {
  results: RegTokenType[];
};

// ******************************************************  NEW API  *************************************************************** //

export type GetTokenResponseType = {
  success: boolean;
  error_message: string;
  token: string;
  lifetime: string;
};

export type GetTokenRequestType = {
  destination_mo: string;
};

export type TokensStorageType = {
  [destination_mo: string]: GetTokenResponseType;
};

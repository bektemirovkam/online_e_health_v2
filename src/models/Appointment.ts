export interface IUserData {
  ErrorCode: 0 | 10 | 100 | 110 | 120 | 130 | 140 | 200 | 300;
  ErrorDesc: string;
  RegAvailable: 0 | 1;
  RegToProfileSpecs?: boolean;
  ShowRegularExamsNotice?: boolean;
  ServerDate: string;
  StatusOSMS: string;
  FIO?: string;
  Address?: string;
  PhoneNumber?: string;
  BirthDay?: string;
  AttachmentID?: string;
  Attachment?: string;
  TerritoryID?: string;
  Territory?: string;
  DoctorID?: string;
  Doctor?: string;
  HomeCallAvailable?: 0 | 1;
  AttachmentAddress?: string;
  DoctorBuilding?: string;
  DoctorBuildingAddress?: string;
  OrgErrors?: IOrgError[];
  ED_TextFluoro?: string;
  ED_TextExam?: string;
  ED_TextRW?: string;
  ED_LastFluoroDate?: string;
  ED_LastExamDate?: string;
  ED_LastRWDate?: string;
  ED_FluoroIsNeeding?: boolean;
  ED_ExamIsNeeding?: boolean;
  ED_RWIsNeeding?: boolean;
  ED_ShowMessage?: boolean;
  ED_RegAvailable?: boolean;
}

export interface IOrgError {
  OrgID: string;
  Name: string;
  ErrorText: string;
}

export interface IOrgInfoByAppointment {
  OrgID: string;
  Name: string;
  ShowMessage: boolean;
  MessageText: string;
  DisableDoctorSelection: boolean;
}

export interface IGetOrgListForAppointment {
  ErrorDesc: string;
  ErrorCode: 0 | 100;
  Orgs: IOrgInfoByAppointment[];
}

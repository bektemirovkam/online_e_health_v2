export type UserDataType = {
  ErrorCode: 0 | 10 | 100 | 110 | 120 | 130 | 140 | 200 | 300;
  ErrorDesc: string;
  RegAvailable: 0 | 1;
  RegToProfileSpecs?: boolean;
  ShowRegularExamsNotice?: boolean;
  ServerDate: string;
  StatusOSMS: string;
  StatusBMG: boolean;
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
  OrgErrors?: OrgErrorType[];
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
  ApiVersion?: 1 | 2;
};

export type UserProfileType = UserDataType & { family: FamilyItemType[] };

export type OrgErrorType = {
  OrgID: string;
  Name: string;
  ErrorText: string;
};

export type FamilyItemType = FamilyPersonFormData & { id: string };

export type FamilyPersonFormData = {
  name: string;
  IIN: string;
};

export type GetMedicalDocInfoType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100 | 200 | 300;
  Patient: string;
  Status: string;
  IsValid: boolean;
  DateIssue: string;
  DateRenewal?: string;
  DateClosing?: string;
};

export type MedicalsDocTypes = {
  ID: number;
  Name: string;
};

export type MedicalDocResponseType = {
  ErrorCode: number;
  ErrorDesc: string;
  Types: MedicalsDocTypes[];
};

export type AuthResponseType = {
  ErrorDesc: string;
  ErrorCode:
    | 0
    | 100
    | 110
    | 200
    | 210
    | 300
    | 310
    | 320
    | 330
    | 350
    | 360
    | 370
    | 400
    | 410;
};

export type UserLoginResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100 | 110 | 200 | 210 | 220 | 300 | 310 | 320;
  AuthToken: string;
  FIO: string;
  Address: string;
  Territory: string;
  TerritoryID: string;
  Attachment: string;
  AttachmentID: string;
  IdentityConfirmed: boolean;
};

export type SickListQueryType = {
  orgid?: string;
  number?: string;
  doctype?: string;
  date?: string;
};

export type SickListQueryKeysType = keyof SickListQueryType;

export type CheckLoginActualityResponseType = {
  ErrorDesc: string;
  ErrorCode: 0 | 100 | 110 | 200 | 210 | 220;
  IsActual: boolean;
};

// ******************************************************  NEW API  *************************************************************** //

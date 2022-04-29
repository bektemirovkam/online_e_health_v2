export type MedicalCardListElementType = {
  OrgID: string;
  DocTypeID: MedicalElementType;
  DocUID: string;
  DocNumber: string;
  DocDate: string;
  OrgName: string;
  DocDescription: string;
};

export type MedicalElementType = "1" | "2";

export type GetMedicalDocsListResponseType = {
  DocumentsList: MedicalCardListElementType[];
  ErrorDesc: string;
  ErrorCode: 0 | 1 | 100 | 200 | 300 | 400;
};

export type GetMedicalDocumentResponseType = {
  MedicalDocFilePDF: string;
  MedicalDocFilePathOnFTP: string;
  MedicalDocFileName: string;
  ErrorDesc: string;
  ErrorCode: 0 | 1 | 100 | 200 | 300 | 400;
};

export type DocumentProgressType = "loading" | "error" | string;

export type DocumentsStatusType = { [id: string]: DocumentProgressType };

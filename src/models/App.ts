export type ActionsCreatorsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type ServerTimeResponseType = {
  ErrorCode: number;
  ErrorDesc: string;
  ServerTime: string;
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

import { SECRET_KEY, SEPARATOR } from "./keys";
import { formatter } from "../utils/formatToBase64";
import { GetServerTime } from "./getServerTime";
import {
  GetMedicalDocInfoType,
  MedicalDocResponseType,
  UserDataType,
} from "../models/User";

import axios from "../api/axios";

export const userApi = {
  GetPatientByIIN: async (IIN: string) => {
    const { data } = await axios.post<UserDataType>("GetPatientByIIN", { IIN });
    return data;
  },
  GetMedicalDocInfo: async (
    OrgID: string,
    ListNumber: string,
    DocType: number,
    DocDate: string
  ) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${OrgID}&DocNumber=${ListNumber}&DocType=${DocType}&DocDate=${DocDate}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgID", OrgID);
    params.append("DocNumber", ListNumber);
    params.append("DocType", String(DocType));
    params.append("DocDate", DocDate);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    const { data } = await axios.post<GetMedicalDocInfoType>(
      "GetMedicalDocInfo",
      params
    );
    return data;
  },
  GetMedicalDocTypes: async () => {
    const dataTime = await GetServerTime();
    const paramsString = `AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    const { data } = await axios.post<MedicalDocResponseType>(
      "GetMedicalDocTypes",
      params
    );

    return data;
  },
};

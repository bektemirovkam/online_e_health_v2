import { UserDataType } from "../models/User";

import axios from "../api/axios";

export const userApi = {
  GetPatientByIIN: async (IIN: string) => {
    const { data } = await axios.post<UserDataType>("GetPatientByIIN", { IIN });
    return data;
  },
};

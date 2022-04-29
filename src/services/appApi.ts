import { GetTokenRequestType, GetTokenResponseType } from "../models/App";
import axios from "../api/axios";

export const newAppApi = {
  getToken: async (formData: GetTokenRequestType) => {
    const { data } = await axios.post<GetTokenResponseType>(
      `getToken`,
      formData
    );

    return data;
  },
};

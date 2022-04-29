import axios from "../api/axios";
import { ServerTimeResponseType } from "../models/App";

export const GetServerTime = async () => {
  const { data } = await axios.post<ServerTimeResponseType>("GetServerTime");
  return data;
};

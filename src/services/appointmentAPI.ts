import { nodeAxios } from "../api/axios";
import { IGetOrgListForAppointment, IUserData } from "../models/Appointment";

export const appointmentAPI = {
  GetPatientByIIN: async (IIN: string) => {
    const { data } = await nodeAxios.get<IUserData>(`patient?IIN=${IIN}`);

    return data;
  },
  GetOrgListForAppointment: async () => {
    const { data } = await nodeAxios.get<IGetOrgListForAppointment>(
      `appointment-orgs`
    );

    return data;
  },
};

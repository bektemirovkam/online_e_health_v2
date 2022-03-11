import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGetOrgListForAppointment } from "../models/Appointment";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://srvbase.e-health.kz:4343/sb/hs/PatientCab/",
  }),
  endpoints: (builder) => ({
    getOrgsListForAppointment: builder.query<
      IGetOrgListForAppointment,
      undefined
    >({
      query: () => ({
        url: "GetOrgListForAppointment",
      }),
    }),
  }),
});

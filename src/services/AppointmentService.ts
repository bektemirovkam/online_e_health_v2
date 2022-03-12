import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGetOrgListForAppointment } from "../models/Appointment";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:3032/",
  }),
  endpoints: (builder) => ({
    getOrgsListForAppointment: builder.query<IGetOrgListForAppointment, void>({
      query: () => ({
        url: "appointment-orgs",
      }),
    }),
  }),
  //TODO: для получение всех организаций в которые есть запись
});

export const { useGetOrgsListForAppointmentQuery } = appointmentApi;
